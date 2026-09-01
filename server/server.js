const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');
const logger = require('./utils/logger');

const PORT = env.PORT;

/**
 * Start the server.
 * Connects to MongoDB first, then starts listening.
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    const server = app.listen(PORT, () => {
      logger.info(`🚀 CampusOS API Server running on port ${PORT}`);
      logger.info(`📦 Environment: ${env.NODE_ENV}`);
      logger.info(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });

    // Initialize Socket.io
    const { Server } = require('socket.io');
    const allowedOrigins = [
      'http://localhost:5173',
      'https://campus-os-ai-chi.vercel.app',
      env.CLIENT_URL
    ];

    const io = new Server(server, {
      cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      logger.info(`Client connected: ${socket.id}`);
      
      socket.on('join_room', (userId) => {
        socket.join(userId);
        logger.info(`User ${userId} joined their personal room`);
      });

      socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
    });

    // Make io globally available for controllers/services
    global.io = io;

    // Graceful shutdown handlers
    const gracefulShutdown = (signal) => {
      logger.info(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        logger.info('HTTP server closed.');
        const mongoose = require('mongoose');
        mongoose.connection.close(false).then(() => {
          logger.info('MongoDB connection closed.');
          process.exit(0);
        });
      });

      // Force shutdown if graceful shutdown takes too long
      setTimeout(() => {
        logger.error('Forced shutdown due to timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle unhandled rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error(`Uncaught Exception: ${error.message}`, { stack: error.stack });
      process.exit(1);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
