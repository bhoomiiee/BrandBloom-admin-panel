import mongoose from 'mongoose';
import dns from 'dns';
import { logger } from '../utils/logger.js';

// Resolve MongoDB Atlas SRV records using public DNS servers (prevents querySrv ECONNREFUSED on local resolvers)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (dnsErr) {
  logger.warn(`Could not set custom DNS servers: ${dnsErr.message}`);
}

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(uri);
    logger.info('✅ MongoDB Atlas connected successfully');
  } catch (err) {
    logger.error(`❌ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};
