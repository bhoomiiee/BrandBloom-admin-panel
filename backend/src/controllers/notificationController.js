import { notificationModel } from '../models/notificationModel.js';
import { activityLogModel } from '../models/activityLogModel.js';

export const notificationController = {
  getNotifications: async (req, res) => {
    try {
      const [notifications, unreadCount] = await Promise.all([
        notificationModel.findAll(),
        notificationModel.getUnreadCount()
      ]);
      res.json({ success: true, data: notifications, unreadCount });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  markAsRead: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await notificationModel.markAsRead(id);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Notification not found' });
      }
      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  markAllAsRead: async (req, res) => {
    try {
      await notificationModel.markAllAsRead();
      res.json({ success: true, message: 'All notifications marked as read' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getActivityLogs: async (req, res) => {
    try {
      const { status, search } = req.query;
      const logs = await activityLogModel.findAll({ status, search });
      res.json({ success: true, data: logs, count: logs.length });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
