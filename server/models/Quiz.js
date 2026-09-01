const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
  userAnswer: { type: Number, default: null }
});

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  subject: { type: String, trim: true, required: true },
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null },
  title: { type: String, trim: true, maxlength: 200 },
  questions: [questionSchema],
  score: { type: Number, default: null },
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, default: null },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  timeTaken: { type: Number }
}, {
  timestamps: true
});

quizSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Quiz', quizSchema);
