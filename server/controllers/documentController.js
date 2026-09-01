const Document = require('../models/Document');
const env = require('../config/env');
const { sendSuccess, sendError } = require('../utils/response');
const { getCache, setCache, flushPattern } = require('../utils/cache');

class DocumentController {
  async uploadDocument(req, res, next) {
    try {
      const { title, description, subject, department, semester, category, tags } = req.body;
      
      if (!req.file) {
        return sendError(res, 'No file uploaded', 400);
      }

      const fs = require('fs');
      const crypto = require('crypto');
      const pdfParse = require('pdf-parse');
      const fileBuffer = fs.readFileSync(req.file.path);
      const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      const existingDocWithHash = await Document.findOne({ fileHash, uploadedBy: req.user.id });
      if (existingDocWithHash) {
        fs.unlinkSync(req.file.path);
        return sendError(res, 'You have already uploaded this exact file.', 409);
      }

      let version = 1;
      const existingDocWithName = await Document.findOne({ 
        originalName: req.file.originalname, 
        uploadedBy: req.user.id 
      }).sort({ version: -1 });

      if (existingDocWithName) {
        version = existingDocWithName.version + 1;
      }

      let textContent = '';
      if (req.file.mimetype === 'application/pdf') {
        try {
          const data = await pdfParse(fileBuffer);
          textContent = data.text || '';
        } catch (err) {
          console.error('Failed to parse PDF text:', err);
        }

        // OCR Fallback for scanned PDFs or images
        if (!textContent || textContent.trim().length < 50) {
          try {
            const axios = require('axios');
            const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
            if (apiKey) {
              console.log('Attempting OCR with Gemini...');
              const base64PDF = fileBuffer.toString('base64');
              const payload = {
                contents: [{
                  parts: [
                    { text: "Extract and transcribe all the readable text from this document. Output ONLY the raw text without any markdown formatting or extra conversational text. If there is no readable text, output nothing." },
                    { inlineData: { mimeType: "application/pdf", data: base64PDF } }
                  ]
                }]
              };
              const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
              const response = await axios.post(url, payload, { maxBodyLength: Infinity, maxContentLength: Infinity });
              if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                 textContent = response.data.candidates[0].content.parts[0].text;
                 console.log('OCR extraction successful.');
              }
            }
          } catch (ocrErr) {
            console.error('OCR Fallback failed:', ocrErr.message);
          }
        }
      }

      const document = new Document({
        title: title || req.file.originalname.replace(/\.[^/.]+$/, ''),
        description,
        subject,
        department,
        semester,
        category,
        tags: typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : tags,
        uploadedBy: req.user.id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        fileHash,
        textContent,
        version,
        status: 'pending'
      });

      await document.save();
      await flushPattern('docs:list:*');
      return sendSuccess(res, 'Document uploaded successfully', document, 201);
    } catch (error) {
      next(error);
    }
  }

  async getDocuments(req, res, next) {
    try {
      const { page = 1, limit = 10, department, subject, semester, status, category } = req.query;
      const cacheKey = `docs:list:${req.user.id}:${JSON.stringify(req.query)}`;
      const cached = await getCache(cacheKey);
      if (cached) {
        return sendSuccess(res, 'Documents fetched successfully (cached)', cached, 200);
      }

      const query = {};

      if (department) query.department = department;
      if (subject) query.subject = subject;
      if (semester) query.semester = semester;
      if (category) query.category = category;

      if (req.user.role === 'student') {
        query.$or = [
          { status: 'approved' },
          { uploadedBy: req.user.id }
        ];
        if (status && status === 'approved') {
          query.status = 'approved';
          delete query.$or;
        }
      } else {
        if (status) query.status = status;
      }

      const skip = (page - 1) * limit;
      const documents = await Document.find(query).populate('uploadedBy', 'name email').skip(skip).limit(parseInt(limit));
      const total = await Document.countDocuments(query);

      const result = {
        documents,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit)
      };

      await setCache(cacheKey, result, 600); // 10 min TTL
      return sendSuccess(res, 'Documents fetched successfully', result, 200);
    } catch (error) {
      next(error);
    }
  }

  async getDocument(req, res, next) {
    try {
      const document = await Document.findById(req.params.id).populate('uploadedBy', 'name email');
      if (!document) {
        return sendError(res, 'Document not found', 404);
      }

      if (req.user.role === 'student' && document.status !== 'approved' && document.uploadedBy._id.toString() !== req.user.id) {
        return sendError(res, 'Not authorized to view this document', 403);
      }

      return sendSuccess(res, 'Document fetched successfully', document, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateDocument(req, res, next) {
    try {
      const { title, description, subject, tags } = req.body;
      const document = await Document.findById(req.params.id);
      
      if (!document) {
        return sendError(res, 'Document not found', 404);
      }

      if (document.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return sendError(res, 'Not authorized to update this document', 403);
      }

      if (title !== undefined) document.title = title;
      if (description !== undefined) document.description = description;
      if (subject !== undefined) document.subject = subject;
      if (tags !== undefined) document.tags = tags;

      await document.save();
      return sendSuccess(res, 'Document updated successfully', document, 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteDocument(req, res, next) {
    try {
      const document = await Document.findById(req.params.id);
      
      if (!document) {
        return sendError(res, 'Document not found', 404);
      }

      if (document.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return sendError(res, 'Not authorized to delete this document', 403);
      }

      await document.deleteOne();
      await flushPattern('docs:list:*');
      return sendSuccess(res, 'Document deleted successfully', null, 200);
    } catch (error) {
      next(error);
    }
  }

  async viewDocument(req, res, next) {
    try {
      const document = await Document.findById(req.params.id);
      
      if (!document) {
        return sendError(res, 'Document not found', 404);
      }

      if (req.user.role === 'student' && document.status !== 'approved' && document.uploadedBy.toString() !== req.user.id) {
        return sendError(res, 'Not authorized to view this document', 403);
      }

      res.sendFile(document.filePath);
    } catch (error) {
      next(error);
    }
  }

  async downloadDocument(req, res, next) {
    try {
      const document = await Document.findById(req.params.id);
      
      if (!document) {
        return sendError(res, 'Document not found', 404);
      }

      if (req.user.role === 'student' && document.status !== 'approved' && document.uploadedBy.toString() !== req.user.id) {
        return sendError(res, 'Not authorized to download this document', 403);
      }

      res.download(document.filePath, document.originalName);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DocumentController();
