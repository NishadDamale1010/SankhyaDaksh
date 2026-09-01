const Document = require('../models/Document');
const User = require('../models/User');
const notificationService = require('../services/notificationService');
const { sendSuccess, sendError } = require('../utils/response');

class AdminController {
  async approveDocument(req, res, next) {
    try {
      const document = await Document.findById(req.params.id);
      if (!document) {
        return sendError(res, 'Document not found', 404);
      }

      document.status = 'approved';
      document.approvedBy = req.user.id;
      await document.save();

      await notificationService.createNotification({
        userId: document.uploadedBy,
        type: 'document_approved',
        title: 'Document Approved',
        message: `Your document "${document.title}" has been approved.`,
        resourceType: 'document',
        resourceId: document._id
      });

      return sendSuccess(res, 'Document approved successfully', document, 200);
    } catch (error) {
      next(error);
    }
  }

  async rejectDocument(req, res, next) {
    try {
      const { rejectionReason } = req.body;
      if (!rejectionReason) {
        return sendError(res, 'rejectionReason is required', 400);
      }

      const document = await Document.findById(req.params.id);
      if (!document) {
        return sendError(res, 'Document not found', 404);
      }

      document.status = 'rejected';
      document.rejectionReason = rejectionReason;
      await document.save();

      await notificationService.createNotification({
        userId: document.uploadedBy,
        type: 'document_rejected',
        title: 'Document Rejected',
        message: `Your document "${document.title}" has been rejected. Reason: ${rejectionReason}`,
        resourceType: 'document',
        resourceId: document._id
      });

      return sendSuccess(res, 'Document rejected successfully', document, 200);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, email, password, role = 'faculty', department, institution } = req.body;
      if (!name || !name.trim()) return sendError(res, 'Name is required', 400);
      if (!email || !email.trim()) return sendError(res, 'Email is required', 400);
      if (!password || password.length < 6) return sendError(res, 'Password must be at least 6 characters', 400);

      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        return sendError(res, 'An account with this email address already exists', 400);
      }

      const validRoles = ['student', 'faculty', 'admin'];
      const userRole = validRoles.includes(role) ? role : 'faculty';

      const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        role: userRole,
        department: department || 'Computer Science',
        institution: institution || 'CampusOS',
        isEmailVerified: true,
        isActive: true
      });

      return sendSuccess(res, `${userRole === 'faculty' ? 'Teacher/Faculty' : 'User'} account created successfully`, user.toSafeObject(), 201);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      if (id === req.user.id) {
        return sendError(res, 'You cannot delete your own admin account', 400);
      }

      const user = await User.findByIdAndDelete(id);
      if (!user) return sendError(res, 'User not found', 404);

      return sendSuccess(res, 'User account deleted successfully', { id }, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, role, department, isActive } = req.body;

      const user = await User.findById(id);
      if (!user) return sendError(res, 'User not found', 404);

      if (name) user.name = name.trim();
      if (email) user.email = email.toLowerCase().trim();
      if (role && ['student', 'faculty', 'admin'].includes(role)) user.role = role;
      if (department !== undefined) user.department = department;
      if (isActive !== undefined) user.isActive = isActive;

      await user.save();
      return sendSuccess(res, 'User details updated successfully', user.toSafeObject(), 200);
    } catch (error) {
      next(error);
    }
  }

  async assignFaculty(req, res, next) {
    try {
      const { userId } = req.body;
      if (!userId) return sendError(res, 'userId is required', 400);

      const user = await User.findById(userId);
      if (!user) return sendError(res, 'User not found', 404);

      user.role = 'faculty';
      await user.save();

      return sendSuccess(res, 'Faculty role assigned successfully', user, 200);
    } catch (error) {
      next(error);
    }
  }

  async manageUsers(req, res, next) {
    try {
      const { page = 1, limit = 50, role, department, isActive, search } = req.query;
      const query = {};

      if (role && role !== 'all') query.role = role.toLowerCase();
      if (department) query.department = department;
      if (isActive !== undefined) query.isActive = isActive === 'true';
      if (search && search.trim()) {
        const searchRegex = new RegExp(search.trim(), 'i');
        query.$or = [
          { name: searchRegex },
          { email: searchRegex },
          { department: searchRegex },
          { role: searchRegex }
        ];
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const users = await User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await User.countDocuments(query);
      const totalFaculty = await User.countDocuments({ role: 'faculty' });
      const totalStudents = await User.countDocuments({ role: 'student' });
      const totalAdmins = await User.countDocuments({ role: 'admin' });

      return sendSuccess(res, 'Users fetched successfully', {
        users,
        total,
        stats: {
          totalUsers: await User.countDocuments({}),
          faculty: totalFaculty,
          students: totalStudents,
          admins: totalAdmins
        },
        page: parseInt(page),
        totalPages: Math.ceil(total / limit)
      }, 200);
    } catch (error) {
      next(error);
    }
  }
}


module.exports = new AdminController();
