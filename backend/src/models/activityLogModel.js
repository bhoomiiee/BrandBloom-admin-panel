import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  actor: { type: String },
  action: { type: String },
  target: { type: String },
  timestamp: { type: String },
  status: { type: String, default: 'info' },
  details: { type: String }
}, { versionKey: false });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export const activityLogModel = {
  findAll: async (filter = {}) => {
    let query = {};
    if (filter.status && filter.status !== 'all') query.status = filter.status;
    if (filter.search) {
      const q = new RegExp(filter.search, 'i');
      query.$or = [{ action: q }, { target: q }, { actor: q }];
    }
    return ActivityLog.find(query).sort({ timestamp: -1 }).lean();
  },

  create: async (data) => {
    const log = new ActivityLog({
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'info',
      ...data
    });
    await log.save();
    return log.toObject();
  }
};

export { ActivityLog };
