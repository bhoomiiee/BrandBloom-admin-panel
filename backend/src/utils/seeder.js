import { Store } from '../models/storeModel.js';
import { Recommendation } from '../models/recommendationModel.js';
import { Upgrade } from '../models/upgradeModel.js';
import { Notification } from '../models/notificationModel.js';
import { ActivityLog } from '../models/activityLogModel.js';
import { Settings } from '../models/settingsModel.js';
import {
  initialStores,
  initialRecommendations,
  initialUpgradeRequests,
  initialNotifications,
  initialActivityLogs,
  initialSettings
} from './seedData.js';
import { logger } from './logger.js';

export const seedDatabase = async () => {
  try {
    const storeCount = await Store.countDocuments();
    if (storeCount === 0) {
      await Store.insertMany(initialStores);
      logger.info(`🌱 Seeded ${initialStores.length} stores`);
    }

    const recCount = await Recommendation.countDocuments();
    if (recCount === 0) {
      await Recommendation.insertMany(initialRecommendations);
      logger.info(`🌱 Seeded ${initialRecommendations.length} recommendations`);
    }

    const upgCount = await Upgrade.countDocuments();
    if (upgCount === 0) {
      await Upgrade.insertMany(initialUpgradeRequests);
      logger.info(`🌱 Seeded ${initialUpgradeRequests.length} upgrade requests`);
    }

    const notifCount = await Notification.countDocuments();
    if (notifCount === 0) {
      await Notification.insertMany(initialNotifications);
      logger.info(`🌱 Seeded ${initialNotifications.length} notifications`);
    }

    const logCount = await ActivityLog.countDocuments();
    if (logCount === 0) {
      await ActivityLog.insertMany(initialActivityLogs);
      logger.info(`🌱 Seeded ${initialActivityLogs.length} activity logs`);
    }

    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({ key: 'platform', ...initialSettings });
      logger.info('🌱 Seeded platform settings');
    }

    logger.info('✅ Database seed check complete');
  } catch (err) {
    logger.error(`❌ Database seeding failed: ${err.message}`);
  }
};
