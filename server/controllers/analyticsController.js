const analyticsService = require('../services/analyticsService');
const { sendSuccess, sendError } = require('../utils/response');
const { getCache, setCache } = require('../utils/cache');

class AnalyticsController {
  async dashboardStats(req, res, next) {
    try {
      const cacheKey = `analytics:dashboard:${req.user.id}:${req.user.role}`;
      const cached = await getCache(cacheKey);
      if (cached) {
        return sendSuccess(res, 'Dashboard stats fetched successfully (cached)', cached, 200);
      }

      let stats;
      if (req.user.role === 'admin') {
        stats = await analyticsService.getAdminDashboardStats();
      } else {
        stats = await analyticsService.getUserDashboardStats(req.user.id);
      }

      await setCache(cacheKey, stats, 300); // 5 min TTL
      return sendSuccess(res, 'Dashboard stats fetched successfully', stats, 200);
    } catch (error) {
      next(error);
    }
  }

  async uploadStats(req, res, next) {
    try {
      const stats = await analyticsService.getUploadStats(req.user.id);
      return sendSuccess(res, 'Upload stats fetched successfully', stats, 200);
    } catch (error) {
      next(error);
    }
  }

  async subjectAnalytics(req, res, next) {
    try {
      const stats = await analyticsService.getSubjectAnalytics(req.user.id);
      return sendSuccess(res, 'Subject analytics fetched successfully', stats, 200);
    } catch (error) {
      next(error);
    }
  }

  async activityAnalytics(req, res, next) {
    try {
      const days = req.query.days ? parseInt(req.query.days) : 30;
      const stats = await analyticsService.getActivityAnalytics(req.user.id, days);
      return sendSuccess(res, 'Activity analytics fetched successfully', stats, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AnalyticsController();
