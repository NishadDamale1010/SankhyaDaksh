const Quiz = require('../models/Quiz');
const Document = require('../models/Document');
const Activity = require('../models/Activity');
const aiService = require('../services/aiService');
const { sendSuccess, sendError } = require('../utils/response');
const { isValidObjectId, isNonEmptyString } = require('../utils/validator');

/**
 * @desc    Generate and save a new quiz (AI-powered)
 * @route   POST /api/quizzes
 * @access  Private
 */
const createQuiz = async (req, res, next) => {
  try {
    const { title, topic, documentId, numQuestions, difficulty, textContent } = req.body;

    if (!isNonEmptyString(title)) {
      return sendError(res, 400, 'Quiz title is required.');
    }

    let sourceText = textContent || '';

    // If a document is referenced, use its text content
    if (documentId && isValidObjectId(documentId)) {
      const document = await Document.findOne({ _id: documentId, user: req.user.id });
      if (document && document.textContent) {
        sourceText = document.textContent;
      }
    }

    if (!isNonEmptyString(sourceText)) {
      return sendError(
        res,
        400,
        'Text content or a document with extracted text is required to generate a quiz.'
      );
    }

    // Generate quiz questions using AI
    const questions = await aiService.generateQuiz(sourceText, {
      numQuestions: numQuestions || 5,
      difficulty: difficulty || 'medium',
      topic: topic || '',
    });

    // Save quiz
    const quiz = await Quiz.create({
      user: req.user.id,
      subject: topic || 'General',
      document: documentId || null,
      title,
      topic: topic || '',
      questions,
      totalQuestions: questions.length,
      difficulty: difficulty || 'medium',
      status: 'pending',
    });

    // Log activity
    await Activity.create({
      user: req.user.id,
      action: 'quiz_created',
      description: `Created quiz: ${title}`,
      resourceType: 'quiz',
      resourceId: quiz._id,
    });

    return sendSuccess(res, 201, 'Quiz generated successfully.', { quiz });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit quiz answers and calculate score
 * @route   PUT /api/quizzes/:id/submit
 * @access  Private
 */
const submitQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers, timeTaken } = req.body;

    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid quiz ID.');
    }

    if (!Array.isArray(answers)) {
      return sendError(res, 400, 'Answers must be an array of answer indices.');
    }

    const quiz = await Quiz.findOne({ _id: id, user: req.user.id });
    if (!quiz) {
      return sendError(res, 404, 'Quiz not found.');
    }

    if (quiz.status === 'completed') {
      return sendError(res, 400, 'This quiz has already been submitted.');
    }

    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index] !== undefined ? answers[index] : null;
      question.userAnswer = userAnswer;
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });

    quiz.score = correctCount;
    quiz.percentage = Math.round((correctCount / quiz.totalQuestions) * 100);
    quiz.status = 'completed';
    quiz.timeTaken = timeTaken || null;

    await quiz.save();

    // Log activity
    await Activity.create({
      user: req.user.id,
      action: 'quiz_completed',
      description: `Completed quiz: ${quiz.title} - Score: ${quiz.percentage}%`,
      resourceType: 'quiz',
      resourceId: quiz._id,
      metadata: { score: quiz.score, total: quiz.totalQuestions, percentage: quiz.percentage },
    });

    return sendSuccess(res, 200, 'Quiz submitted successfully.', { quiz });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get quiz history for the authenticated user
 * @route   GET /api/quizzes
 * @access  Private
 */
const getQuizHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const [quizzes, total] = await Promise.all([
      Quiz.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title topic totalQuestions score percentage difficulty status createdAt')
        .populate('document', 'title')
        .lean(),
      Quiz.countDocuments({ user: req.user.id }),
    ]);

    return sendSuccess(res, 200, 'Quiz history retrieved successfully.', {
      quizzes,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single quiz with all questions
 * @route   GET /api/quizzes/:id
 * @access  Private
 */
const getQuizById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid quiz ID.');
    }

    const quiz = await Quiz.findOne({ _id: id, user: req.user.id })
      .populate('document', 'title originalName');

    if (!quiz) {
      return sendError(res, 404, 'Quiz not found.');
    }

    return sendSuccess(res, 200, 'Quiz retrieved successfully.', { quiz });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a quiz
 * @route   DELETE /api/quizzes/:id
 * @access  Private
 */
const deleteQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid quiz ID.');
    }

    const quiz = await Quiz.findOneAndDelete({ _id: id, user: req.user.id });
    if (!quiz) {
      return sendError(res, 404, 'Quiz not found.');
    }

    return sendSuccess(res, 200, 'Quiz deleted successfully.', { quizId: id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuiz,
  submitQuiz,
  getQuizHistory,
  getQuizById,
  deleteQuiz,
};
