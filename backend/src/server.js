import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seeder.js';
import { logger } from './utils/logger.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

const app = express();

const BRANDBLOOM_LIVE_API = process.env.BRANDBLOOM_API_URL || 'http://localhost:3000/api';

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Live Real-Time Bridge Middleware to BrandBloom (PostgreSQL)
app.use('/api', async (req, res, next) => {
  if (req.path === '/health') {
    return res.json({
      status: 'healthy',
      name: 'BrandBloom Admin Panel API',
      syncedWith: BRANDBLOOM_LIVE_API,
      mode: 'live-realtime-sync',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const targetUrl = `${BRANDBLOOM_LIVE_API}${req.path}${req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : ''}`;
    const options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {})
      }
    };
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && Object.keys(req.body || {}).length > 0) {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    // If BrandBloom live API is offline, fall back to local handlers
    next();
  }
});

// API Routes Fallback
app.use('/api', apiRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    brand: 'BrandBloom',
    role: 'Admin Panel API',
    status: 'online',
    version: '1.0.0',
    mode: 'Real-Time Synchronized',
    syncedBackend: BRANDBLOOM_LIVE_API,
    endpoints: '/api/health, /api/stores, /api/recommendations, /api/upgrades, /api/analytics, /api/notifications, /api/settings'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = config.port || 5000;

const start = async () => {
  logger.info(`🌸 BrandBloom Backend API is running on port ${PORT}`);
  logger.info(`🔗 Real-Time Bridge Active: Synchronized with BrandBloom on ${BRANDBLOOM_LIVE_API}`);
  logger.info(`🌸 Health check: http://localhost:${PORT}/api/health`);

  // Try optional MongoDB connection in background without blocking startup
  if (process.env.MONGODB_URI) {
    try {
      await connectDB();
      await seedDatabase();
    } catch (err) {
      logger.warn(`Optional MongoDB skipped: ${err.message}`);
    }
  }

  app.listen(PORT);
};

start();

export default app;
