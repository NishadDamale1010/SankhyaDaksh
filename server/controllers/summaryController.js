const Summary = require('../models/Summary');
const Document = require('../models/Document');
const Activity = require('../models/Activity');
const aiService = require('../services/aiService');
const { sendSuccess, sendError } = require('../utils/response');
const { isValidObjectId, isNonEmptyString } = require('../utils/validator');

/**
 * @desc    Generate and save a summary (AI-powered)
 * @route   POST /api/summaries
 * @access  Private
 */
const createSummary = async (req, res, next) => {
  try {
    const { title, documentId, textContent, summaryType, customPrompt } = req.body;

    if (!isNonEmptyString(title)) {
      return sendError(res, 400, 'Summary title is required.');
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
        'Text content or a document with extracted text is required to generate a summary.'
      );
    }

    // Generate summary using AI
    const aiResult = await aiService.generateSummary(sourceText, {
      summaryType: summaryType || 'detailed',
      customPrompt: customPrompt || '',
    });

    // Save summary
    const summary = await Summary.create({
      user: req.user.id,
      document: documentId || null,
      title,
      summary: aiResult.summaryText || aiResult.summary || '',
      summaryType: summaryType || 'detailed',
    });

    // Log activity
    await Activity.create({
      user: req.user.id,
      action: 'summary_created',
      description: `Created summary: ${title}`,
      resourceType: 'summary',
      resourceId: summary._id,
    });

    return sendSuccess(res, 201, 'Summary generated successfully.', { summary });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get summary history for the authenticated user
 * @route   GET /api/summaries
 * @access  Private
 */
const getSummaryHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const [summaries, total] = await Promise.all([
      Summary.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title summaryType wordCount document createdAt')
        .populate('document', 'title')
        .lean(),
      Summary.countDocuments({ user: req.user.id }),
    ]);

    return sendSuccess(res, 200, 'Summary history retrieved successfully.', {
      summaries,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single summary
 * @route   GET /api/summaries/:id
 * @access  Private
 */
const getSummaryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid summary ID.');
    }

    const summary = await Summary.findOne({ _id: id, user: req.user.id })
      .populate('document', 'title originalName');

    if (!summary) {
      return sendError(res, 404, 'Summary not found.');
    }

    return sendSuccess(res, 200, 'Summary retrieved successfully.', { summary });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a summary
 * @route   DELETE /api/summaries/:id
 * @access  Private
 */
const deleteSummary = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid summary ID.');
    }

    const summary = await Summary.findOneAndDelete({ _id: id, user: req.user.id });
    if (!summary) {
      return sendError(res, 404, 'Summary not found.');
    }

    return sendSuccess(res, 200, 'Summary deleted successfully.', { summaryId: id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSummary,
  getSummaryHistory,
  getSummaryById,
  deleteSummary,
};
