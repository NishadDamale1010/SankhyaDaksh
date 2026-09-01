const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');
const { sendError } = require('../utils/response');

/**
 * JWT Authentication Middleware
 * Verifies the Bearer token from the Authorization header.
 * Attaches the decoded user to req.user.
 */
const authenticate = async (req, res, next) => {
  try {
    let token = null;

    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 401, 'Access denied. No token provided.');
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return sendError(res, 401, 'Token has expired. Please login again.');
      }
      if (err.name === 'JsonWebTokenError') {
        return sendError(res, 401, 'Invalid token. Please login again.');
      }
      return sendError(res, 401, 'Token verification failed.');
    }

    // Find user by decoded id
    const user = await User.findById(decoded.id).select('-password -refreshToken');
    if (!user) {
      return sendError(res, 401, 'User associated with this token no longer exists.');
    }

    // Check if user is active
    if (!user.isActive) {
      return sendError(res, 403, 'Your account has been deactivated. Please contact support.');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Optional Authentication Middleware
 * If a valid token is present, attach the user. Otherwise, continue without error.
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -refreshToken');

    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Token is invalid or expired; proceed without user
    next();
  }
};

module.exports = { authenticate, optionalAuth };
