const crypto = require('crypto');
const path = require('path');

const generateUniqueFilename = (originalName, prefix = '') => {
  const ext = path.extname(originalName);
  const hash = crypto.randomBytes(8).toString('hex');
  return `${prefix ? prefix + '-' : ''}${Date.now()}-${hash}${ext}`;
};

module.exports = {
  generateUniqueFilename
};
