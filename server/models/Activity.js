const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  action: {
    type: String,
    required: true,
    enum: ['login', 'register', 'logout', 'profile_update', 'upload', 'upload_document', 'chat', 'chat_message', 'quiz', 'quiz_created', 'quiz_completed', 'summary', 'summarize', 'summary_created', 'delete_document', 'document_delete', 'assignment_create', 'viva', 'search', 'outline', 'flashcards', 'recommend', 'pyq', 'syllabus', 'paper', 'planner']
  },
  description: { type: String },
  details: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  resourceType: { type: String, enum: ['document', 'chat', 'quiz', 'summary', 'user', 'assignment', 'system'] },
  resourceId: { type: mongoose.Schema.Types.ObjectId },
  ipAddress: { type: String },
  userAgent: { type: String }
}, {
  timestamps: true
});

activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ action: 1, createdAt: -1 });
activitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

module.exports = mongoose.model('Activity', activitySchema);
