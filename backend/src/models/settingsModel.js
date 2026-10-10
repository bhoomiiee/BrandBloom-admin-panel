import mongoose from 'mongoose';
import { initialSettings } from '../utils/seedData.js';

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'platform' },
  general: { type: mongoose.Schema.Types.Mixed },
  aiEngine: { type: mongoose.Schema.Types.Mixed },
  upgrades: { type: mongoose.Schema.Types.Mixed },
  notifications: { type: mongoose.Schema.Types.Mixed }
}, { versionKey: false });

const Settings = mongoose.model('Settings', settingsSchema);

export const settingsModel = {
  get: async () => {
    let settings = await Settings.findOne({ key: 'platform' }).lean();
    if (!settings) {
      // Auto-create default settings if not seeded yet
      const created = await Settings.create({ key: 'platform', ...initialSettings });
      return created.toObject();
    }
    return settings;
  },

  update: async (updates) => {
    const current = await settingsModel.get();
    const merged = {
      general: { ...current.general, ...(updates.general || {}) },
      aiEngine: { ...current.aiEngine, ...(updates.aiEngine || {}) },
      upgrades: { ...current.upgrades, ...(updates.upgrades || {}) },
      notifications: { ...current.notifications, ...(updates.notifications || {}) }
    };
    return Settings.findOneAndUpdate(
      { key: 'platform' },
      merged,
      { new: true, lean: true, upsert: true }
    );
  }
};

export { Settings };
