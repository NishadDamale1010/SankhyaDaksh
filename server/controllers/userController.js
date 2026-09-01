const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

class UserController {
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return sendError(res, 'User not found', 404);
      }
      return sendSuccess(res, 'User fetched successfully', user, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { role, isActive, department, semester } = req.body;
      const updates = {};
      if (role !== undefined) updates.role = role;
      if (isActive !== undefined) updates.isActive = isActive;
      if (department !== undefined) updates.department = department;
      if (semester !== undefined) updates.semester = semester;

      const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
      if (!user) {
        return sendError(res, 'User not found', 404);
      }
      return sendSuccess(res, 'User updated successfully', user, 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return sendError(res, 'User not found', 404);
      }
      return sendSuccess(res, 'User deleted successfully', null, 200);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const { page = 1, limit = 10, role, department, semester, search } = req.query;
      const query = {};

      if (role) query.role = role;
      if (department) query.department = department;
      if (semester) query.semester = semester;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      const skip = (page - 1) * limit;
      const users = await User.find(query).select('-password').skip(skip).limit(parseInt(limit));
      const total = await User.countDocuments(query);

      return sendSuccess(res, 'Users fetched successfully', {
        users,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit)
      }, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
