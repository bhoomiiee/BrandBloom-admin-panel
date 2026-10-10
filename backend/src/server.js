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

// API Routes
app.use('/api', apiRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    brand: 'BrandBloom',
    role: 'Admin Panel API',
    status: 'online',
    version: '1.0.0',
    database: 'MongoDB Atlas',
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

// Start: connect DB first, then seed, then listen
const PORT = config.port || 5000;

const start = async () => {
  await connectDB();
  await seedDatabase();
  app.listen(PORT, () => {
    logger.info(`🌸 BrandBloom Backend API is running on port ${PORT}`);
    logger.info(`🌸 Health check: http://localhost:${PORT}/api/health`);
  });
};

start();

export default app;
