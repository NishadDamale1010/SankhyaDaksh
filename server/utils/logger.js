const logger = {
  error: (msg, meta) => console.error(`[ERROR] ${msg}`, meta || ''),
  info: (msg, meta) => console.log(`[INFO] ${msg}`, meta || ''),
  warn: (msg, meta) => console.warn(`[WARN] ${msg}`, meta || '')
};
module.exports = logger;
