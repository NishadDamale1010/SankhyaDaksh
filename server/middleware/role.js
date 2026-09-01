const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges' });
    }
    next();
  };
};

const adminOnly = authorize('admin');
const facultyOnly = authorize('faculty', 'admin');
const studentOnly = authorize('student', 'faculty', 'admin');

module.exports = {
  authorize,
  adminOnly,
  facultyOnly,
  studentOnly
};
