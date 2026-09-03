const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { generateUniqueFilename } = require('../utils/helpers');

const uploadDir = path.join(__dirname, '../uploads');
const dirs = ['documents', 'notes', 'questionpapers', 'research'];

dirs.forEach(dir => {
  const fullPath = path.join(uploadDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = path.join(uploadDir, 'documents');
    if (req.body.category && dirs.includes(req.body.category)) {
      dest = path.join(uploadDir, req.body.category);
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const userId = req.user ? (req.user._id ? req.user._id.toString() : req.user.id || 'guest') : 'guest';
    const filename = generateUniqueFilename(file.originalname, userId);
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];
  const allowedExtensions = ['.pdf', '.docx', '.ppt', '.pptx'];
  
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOCX, PPT, and PPTX are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

const uploadFile = upload.single('file');

module.exports = {
  uploadFile,
  uploadDir,
  upload
};
