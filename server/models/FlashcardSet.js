const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true }
});

const flashcardSetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  subject: { type: String, trim: true, required: true },
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null },
  title: { type: String, trim: true, maxlength: 200 },
  cards: [flashcardSchema],
  totalCards: { type: Number, required: true }
}, {
  timestamps: true
});

flashcardSetSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('FlashcardSet', flashcardSetSchema);
