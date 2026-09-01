const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null },
  summary: { type: String, required: true },
  title: { type: String },
  summaryType: { type: String, enum: ['brief', 'detailed', 'bullet-points'], default: 'detailed' },
  wordCount: { type: Number, default: 0 },
  model: { type: String, default: 'default' }
}, {
  timestamps: true
});

summarySchema.pre('save', function(next) {
  if (this.isModified('summary') && this.summary) {
    this.wordCount = this.summary.trim().split(/\s+/).length;
  }
  next();
});

summarySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Summary', summarySchema);
