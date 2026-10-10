import { settingsModel } from '../models/settingsModel.js';
import { activityLogModel } from '../models/activityLogModel.js';

export const settingsController = {
  getSettings: async (req, res) => {
    try {
      const settings = await settingsModel.get();
      res.json({ success: true, data: settings });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  updateSettings: async (req, res) => {
    try {
      const updated = await settingsModel.update(req.body);
      await activityLogModel.create({
        actor: 'Admin',
        action: 'Settings Updated',
        target: 'System Configuration',
        status: 'info',
        details: 'Admin updated platform and AI parameters'
      });
      res.json({ success: true, message: 'Settings saved successfully', data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
