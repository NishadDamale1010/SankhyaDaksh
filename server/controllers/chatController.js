const Chat = require('../models/Chat');
const Document = require('../models/Document');
const Activity = require('../models/Activity');
const aiService = require('../services/aiService');
const { sendSuccess, sendError } = require('../utils/response');
const { isValidObjectId, isNonEmptyString } = require('../utils/validator');

/**
 * @desc    Create a new chat or send a message in an existing chat
 * @route   POST /api/chats
 * @access  Private
 */
const sendMessage = async (req, res, next) => {
  try {
    const { chatId, message, documentId } = req.body;

    if (!isNonEmptyString(message)) {
      return sendError(res, 400, 'Message content is required.');
    }

    let chat;
    let documentContext = '';

    // If chatId is provided, find existing chat
    if (chatId) {
      if (!isValidObjectId(chatId)) {
        return sendError(res, 400, 'Invalid chat ID.');
      }

      chat = await Chat.findOne({ _id: chatId, user: req.user.id });
      if (!chat) {
        return sendError(res, 404, 'Chat not found.');
      }
    } else {
      // Create a new chat
      const chatData = {
        user: req.user.id,
        title: message.substring(0, 100),
        messages: [],
      };

      // If a document is referenced, attach it
      if (documentId && isValidObjectId(documentId)) {
        const document = await Document.findOne({
          _id: documentId,
          user: req.user.id,
        });
        if (document) {
          chatData.document = document._id;
          documentContext = document.textContent || '';
        }
      }

      chat = await Chat.create(chatData);
    }

    // If chat has a document reference but we haven't loaded context yet
    if (chat.document && !documentContext) {
      const document = await Document.findById(chat.document);
      if (document) {
        documentContext = document.textContent || '';
      }
    }

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
    });

    // Build chat history for AI (last 20 messages for context window management)
    const recentMessages = chat.messages.slice(-20).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Get AI response
    const aiResponse = await aiService.chatWithDocument(recentMessages, documentContext);

    // Add AI response to chat
    chat.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    });

    await chat.save();

    // Log activity
    await Activity.create({
      user: req.user.id,
      action: 'chat_message',
      description: `Sent message in chat: ${chat.title}`,
      resourceType: 'chat',
      resourceId: chat._id,
    });

    return sendSuccess(res, 200, 'Message sent successfully.', {
      chat: {
        _id: chat._id,
        title: chat.title,
        document: chat.document,
        latestMessage: chat.messages[chat.messages.length - 1],
        messageCount: chat.messages.length,
      },
      aiResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get chat history for the authenticated user
 * @route   GET /api/chats
 * @access  Private
 */
const getChatHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const [chats, total] = await Promise.all([
      Chat.find({ user: req.user.id })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title document messages model isActive createdAt updatedAt')
        .populate('document', 'title originalName')
        .lean()
        .then((results) =>
          results.map((chat) => ({
            ...chat,
            messageCount: chat.messages ? chat.messages.length : 0,
            lastMessage:
              chat.messages && chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1]
                : null,
            messages: undefined, // Remove full messages array from list
          }))
        ),
      Chat.countDocuments({ user: req.user.id }),
    ]);

    return sendSuccess(res, 200, 'Chat history retrieved successfully.', {
      chats,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single chat with all messages
 * @route   GET /api/chats/:id
 * @access  Private
 */
const getChatById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid chat ID.');
    }

    const chat = await Chat.findOne({ _id: id, user: req.user.id })
      .populate('document', 'title originalName');

    if (!chat) {
      return sendError(res, 404, 'Chat not found.');
    }

    return sendSuccess(res, 200, 'Chat retrieved successfully.', { chat });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a chat
 * @route   DELETE /api/chats/:id
 * @access  Private
 */
const deleteChat = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid chat ID.');
    }

    const chat = await Chat.findOneAndDelete({ _id: id, user: req.user.id });
    if (!chat) {
      return sendError(res, 404, 'Chat not found.');
    }

    return sendSuccess(res, 200, 'Chat deleted successfully.', { chatId: id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
  getChatById,
  deleteChat,
};
