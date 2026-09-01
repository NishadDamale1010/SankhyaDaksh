const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  marks: { type: Number, default: 0 }
});

const assignmentSchema = new mongoose.Schema({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  subject: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String },
  questions: [questionSchema],
  department: { type: String, trim: true },
  semester: { type: Number },
  dueDate: { type: Date },
  status: { type: String, enum: ['active', 'closed'], default: 'active' }
}, {
  timestamps: true
});

assignmentSchema.index({ faculty: 1, createdAt: -1 });
assignmentSchema.index({ department: 1, semester: 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);
