module.exports = {
  sendSuccess: (res, message, data, code = 200) => res.status(code).json({ success: true, message, data }),
  sendError: (res, message, code = 500) => res.status(code).json({ success: false, message })
};
