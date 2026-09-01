const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, maxlength: 500 },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number, required: true, min: 0 },
  mimeType: { type: String },
  fileType: { type: String, enum: ['pdf', 'docx', 'ppt', 'pptx'], default: 'pdf' },
  fileHash: { type: String, index: true },
  version: { type: Number, default: 1 },
  subject: { type: String, trim: true },
  department: { type: String, trim: true },
  semester: { type: Number },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  category: { type: String, enum: ['notes', 'questionpapers', 'research', 'documents'], default: 'documents' },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'processing'], default: 'pending' },
  cloudinaryId: { type: String },
  cloudinaryUrl: { type: String },
  textContent: { type: String },
  pageCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  rejectionReason: { type: String },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

documentSchema.index({ uploadedBy: 1, createdAt: -1 });
documentSchema.index({ department: 1, subject: 1 });
documentSchema.index({ status: 1 });

module.exports = mongoose.model('Document', documentSchema);
