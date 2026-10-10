import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - Error:`, err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
