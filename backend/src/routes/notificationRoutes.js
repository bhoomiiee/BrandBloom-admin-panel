import express from 'express';
import { notificationController } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', notificationController.getNotifications);
router.patch('/:id/read', notificationController.markAsRead);
router.post('/mark-all-read', notificationController.markAllAsRead);
router.get('/activity-logs', notificationController.getActivityLogs);

export default router;
