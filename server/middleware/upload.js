const { uploadFile } = require('../config/multer');

const uploadMiddleware = (req, res, next) => {
  uploadFile(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File is too large. Maximum size is 50MB.' });
      }
      return res.status(400).json({ success: false, message: err.message || 'Error uploading file' });
    }
    next();
  });
};

module.exports = uploadMiddleware;
