import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  storeId: { type: String, required: true },
  storeName: { type: String },
  title: { type: String },
  category: { type: String },
  priority: { type: String, default: 'Medium' },
  status: { type: String, default: 'pending' },
  identifiedIssue: { type: String },
  supportingMetrics: { type: mongoose.Schema.Types.Mixed },
  suggestedImprovement: { type: String },
  expectedImpact: { type: String },
  impactScore: { type: Number, default: 80 },
  effort: { type: String, default: 'Low' },
  upgradeRequestId: { type: String, default: null },
  createdAt: { type: String },
  updatedAt: { type: String }
}, { versionKey: false });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export const recommendationModel = {
  findAll: async (filter = {}) => {
    let query = {};
    if (filter.storeId) query.storeId = filter.storeId;
    if (filter.priority && filter.priority !== 'all') query.priority = new RegExp(`^${filter.priority}$`, 'i');
    if (filter.status && filter.status !== 'all') query.status = new RegExp(`^${filter.status}$`, 'i');
    if (filter.category && filter.category !== 'all') query.category = new RegExp(`^${filter.category}$`, 'i');
    if (filter.search) {
      const q = new RegExp(filter.search, 'i');
      query.$or = [{ title: q }, { storeName: q }, { identifiedIssue: q }];
    }
    return Recommendation.find(query).sort({ createdAt: -1 }).lean();
  },

  findById: async (id) => Recommendation.findOne({ id }).lean(),

  create: async (data) => {
    const rec = new Recommendation({
      id: `rec-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      upgradeRequestId: null,
      ...data
    });
    await rec.save();
    return rec.toObject();
  },

  updateStatus: async (id, status) => {
    return Recommendation.findOneAndUpdate(
      { id },
      { status, updatedAt: new Date().toISOString() },
      { new: true, lean: true }
    );
  },

  linkUpgradeRequest: async (id, upgradeRequestId) => {
    return Recommendation.findOneAndUpdate(
      { id },
      { upgradeRequestId, status: 'pushed_to_owner', updatedAt: new Date().toISOString() },
      { new: true, lean: true }
    );
  },

  getStats: async () => {
    const [total, pending, pushed, implemented, highPriority] = await Promise.all([
      Recommendation.countDocuments(),
      Recommendation.countDocuments({ status: 'pending' }),
      Recommendation.countDocuments({ status: 'pushed_to_owner' }),
      Recommendation.countDocuments({ status: 'implemented' }),
      Recommendation.countDocuments({ priority: 'High' })
    ]);
    return { total, pending, pushed, implemented, highPriority };
  }
};

export { Recommendation };
