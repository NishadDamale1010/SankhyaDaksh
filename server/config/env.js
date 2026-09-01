const dotenv = require('dotenv');
const path = require('path');

// Load .env file from server root
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const env = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database & Cache
  MONGODB_URI: process.env.MONGODB_URI || (process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/campusos_test' : undefined),
  REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || (process.env.NODE_ENV === 'test' ? 'test_jwt_secret' : undefined),
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || process.env.REFRESH_TOKEN_SECRET || (process.env.NODE_ENV === 'test' ? 'test_refresh_secret' : undefined),
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '30d',

  // Client
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  // AI Services
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  OPENROUTER_BASE_URL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  OPENROUTER_STREAM_MODEL: process.env.OPENROUTER_STREAM_MODEL || 'openai/gpt-3.5-turbo',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  HF_API_KEY: process.env.HF_API_KEY,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GROQ_STREAM_MODEL: process.env.GROQ_STREAM_MODEL || 'llama-3.1-70b-versatile',
  PYTHON_AI_URL: process.env.PYTHON_AI_URL || 'http://localhost:8000',

  // Admin
  ADMIN_SECRET: process.env.ADMIN_SECRET,

  // Rate Limits
  CHAT_DAILY_LIMIT: parseInt(process.env.CHAT_DAILY_LIMIT, 10) || 20,
  UPLOAD_DAILY_LIMIT: parseInt(process.env.UPLOAD_DAILY_LIMIT, 10) || 20,
  MAX_FILE_SIZE_MB: parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 20,

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  // Email
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  // VAPID (Push Notifications)
  VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
  VAPID_SUBJECT: process.env.VAPID_SUBJECT,

  // External APIs
  RAPID_API_KEY: process.env.RAPID_API_KEY,
};

// Validate critical environment variables
const requiredVars = ['MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
const missing = requiredVars.filter((key) => !env[key]);

if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

module.exports = env;
