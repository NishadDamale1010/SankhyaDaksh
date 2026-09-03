const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const uploadMiddleware = require('../middleware/upload');

// Temporary middleware to mock req.user since auth is disabled for now
const mockAuth = (req, res, next) => {
  req.user = { id: '64d3b8f8f8b8a8a8a8a8a8a8' }; // Dummy Mongo ID
  next();
};

router.post('/chat', mockAuth, aiController.chat);
router.post('/semantic-search', mockAuth, aiController.semanticSearch);
router.post('/summarize', mockAuth, aiController.summarize);
router.post('/outline', mockAuth, aiController.generateOutline);
router.post('/flashcards', mockAuth, aiController.generateFlashcards);
router.post('/viva', mockAuth, aiController.generateViva);
router.post('/recommend', mockAuth, aiController.recommendResources);
router.post('/analyze-pyq', mockAuth, aiController.analyzePYQ);
router.post('/analyze-syllabus', mockAuth, aiController.analyzeSyllabus);
router.post('/generate-paper', mockAuth, aiController.generateQuestionPaper);
router.post('/study-plan', mockAuth, aiController.generateStudyPlan);
router.post('/upload-pdf-quiz', mockAuth, uploadMiddleware, aiController.generateQuizFromPdf);

module.exports = router;
