const Redis = require('ioredis');
const env = require('./env');
const logger = require('../utils/logger');

let redisClient = null;
let isRedisConnected = false;

try {
  redisClient = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 1,
    retryStrategy(times) {
      if (times > 3) {
        // Stop reconnecting after 3 failed attempts to avoid log spam
        return null;
      }
      return Math.min(times * 200, 2000);
    },
    lazyConnect: false,
    enableOfflineQueue: false // Fail fast if offline instead of queuing indefinitely
  });

  redisClient.on('connect', () => {
    isRedisConnected = true;
    if (logger && logger.info) {
      logger.info('⚡ Redis Cache Server Connected Successfully!');
    } else {
      console.log('⚡ Redis Cache Server Connected Successfully!');
    }
  });

  redisClient.on('error', (err) => {
    isRedisConnected = false;
    // Suppress connection error spam when Redis is not running locally
  });

  redisClient.on('close', () => {
    isRedisConnected = false;
  });
} catch (error) {
  isRedisConnected = false;
  console.warn('⚠️ Redis initialization notice: Continuing in direct mode.');
}

const getRedisClient = () => (isRedisConnected ? redisClient : null);
const isConnected = () => isRedisConnected;

module.exports = {
  redisClient,
  getRedisClient,
  isConnected
};
