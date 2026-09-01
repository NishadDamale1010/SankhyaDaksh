const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null }, // Kept for backward compatibility
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  question: { type: String, required: true },
  response: { type: String, required: true },
  citations: [{ type: String }],
  model: { type: String, default: 'default' }
}, {
  timestamps: true
});

chatSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Chat', chatSchema);
