import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  category: { type: String, default: 'General Retail' },
  status: { type: String, enum: ['active', 'declining', 'inactive', 'suspended'], default: 'active' },
  plan: { type: String, default: 'Starter' },
  monthlyRevenue: { type: Number, default: 0 },
  previousRevenue: { type: Number, default: 0 },
  revenueGrowth: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 2.1 },
  bounceRate: { type: Number, default: 45.0 },
  healthScore: { type: Number, default: 75 },
  url: { type: String },
  tags: [String],
  createdAt: { type: String },
  updatedAt: { type: String }
}, { _id: true, versionKey: false });

const Store = mongoose.model('Store', storeSchema);

export const storeModel = {
  findAll: async (filter = {}) => {
    let query = {};
    if (filter.search) {
      const q = new RegExp(filter.search, 'i');
      query.$or = [{ name: q }, { ownerName: q }, { category: q }];
    }
    if (filter.status && filter.status !== 'all') query.status = filter.status;
    if (filter.category && filter.category !== 'all') query.category = new RegExp(`^${filter.category}$`, 'i');

    let sortOpt = { revenueGrowth: 1 }; // default: declining first
    if (filter.sortBy === 'revenue-desc') sortOpt = { monthlyRevenue: -1 };
    else if (filter.sortBy === 'revenue-asc') sortOpt = { monthlyRevenue: 1 };
    else if (filter.sortBy === 'growth-asc') sortOpt = { revenueGrowth: 1 };
    else if (filter.sortBy === 'growth-desc') sortOpt = { revenueGrowth: -1 };
    else if (filter.sortBy === 'health-desc') sortOpt = { healthScore: -1 };
    else if (filter.sortBy === 'name-asc') sortOpt = { name: 1 };

    return Store.find(query).sort(sortOpt).lean();
  },

  findById: async (id) => Store.findOne({ id }).lean(),

  create: async (data) => {
    const newStore = new Store({
      id: `str-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'active',
      monthlyRevenue: 0,
      previousRevenue: 0,
      revenueGrowth: 0,
      totalOrders: 0,
      conversionRate: 2.1,
      bounceRate: 45.0,
      healthScore: 75,
      tags: [],
      ...data
    });
    await newStore.save();
    return newStore.toObject();
  },

  update: async (id, updates) => {
    const updated = await Store.findOneAndUpdate(
      { id },
      { ...updates, updatedAt: new Date().toISOString() },
      { new: true, lean: true }
    );
    return updated;
  },

  updateStatus: async (id, status) => storeModel.update(id, { status }),

  delete: async (id) => {
    const res = await Store.deleteOne({ id });
    return res.deletedCount > 0;
  },

  getStats: async () => {
    const stores = await Store.find({}).lean();
    const total = stores.length;
    const active = stores.filter(s => s.status === 'active' || s.status === 'declining').length;
    const declining = stores.filter(s => s.status === 'declining' || s.revenueGrowth < 0).length;
    const totalRevenue = stores.reduce((sum, s) => sum + (s.monthlyRevenue || 0), 0);
    const totalOrders = stores.reduce((sum, s) => sum + (s.totalOrders || 0), 0);
    const avgConversion = (stores.reduce((sum, s) => sum + (s.conversionRate || 0), 0) / (total || 1)).toFixed(2);
    const avgHealth = Math.round(stores.reduce((sum, s) => sum + (s.healthScore || 0), 0) / (total || 1));
    return { totalStores: total, activeStores: active, decliningStores: declining, totalRevenue, totalOrders, avgConversionRate: parseFloat(avgConversion), avgHealthScore: avgHealth };
  }
};

export { Store };
