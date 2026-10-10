import express from 'express';
import storeRoutes from './storeRoutes.js';
import recommendationRoutes from './recommendationRoutes.js';
import upgradeRoutes from './upgradeRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import settingsRoutes from './settingsRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    name: 'BrandBloom Admin Panel API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

router.use('/stores', storeRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/upgrades', upgradeRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/notifications', notificationRoutes);
router.use('/settings', settingsRoutes);

export default router;
