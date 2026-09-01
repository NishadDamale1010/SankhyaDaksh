const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');
const { getMissingFields } = require('../utils/validator');
const User = require('../models/User');
const Activity = require('../models/Activity');

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password, department, semester } = req.body;
      const missingFields = getMissingFields(req.body, ['name', 'email', 'password']);
      if (missingFields.length > 0) {
        return sendError(res, `Missing fields: ${missingFields.join(', ')}`, 400);
      }

      const result = await authService.registerUser({ name, email, password, department, semester });
      return sendSuccess(res, 'Registration successful', result, 201);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      if (!token) {
        return sendError(res, 'Verification token is required', 400);
      }
      const result = await authService.verifyEmail(token);
      return sendSuccess(res, result.message, null, 200);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const missingFields = getMissingFields(req.body, ['email', 'password']);
      if (missingFields.length > 0) {
        return sendError(res, `Missing fields: ${missingFields.join(', ')}`, 400);
      }

      const result = await authService.loginUser({ email, password });
      return sendSuccess(res, 'Login successful', result, 200);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      await authService.logoutUser(req.user.id);
      return sendSuccess(res, 'Logout successful', null, 200);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const user = await authService.getCurrentUser(req.user.id);
      return sendSuccess(res, 'User fetched successfully', user, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const allowedUpdates = ['name', 'bio', 'institution', 'department', 'semester', 'profilePhoto'];
      const updates = {};
      
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
      if (!user) {
        return sendError(res, 'User not found', 404);
      }

      await Activity.create({
        user: req.user.id,
        action: 'profile_update',
        details: 'User updated profile'
      });

      return sendSuccess(res, 'Profile updated successfully', user, 200);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return sendError(res, 'Refresh token is required', 400);
      }

      const result = await authService.refreshToken(refreshToken);
      return sendSuccess(res, 'Token refreshed successfully', result, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
