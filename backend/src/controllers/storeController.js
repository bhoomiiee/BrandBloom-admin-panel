import { storeModel } from '../models/storeModel.js';
import { activityLogModel } from '../models/activityLogModel.js';
import { notificationModel } from '../models/notificationModel.js';

export const storeController = {
  getStores: async (req, res) => {
    try {
      const { search, status, category, sortBy } = req.query;
      const stores = await storeModel.findAll({ search, status, category, sortBy });
      res.json({ success: true, data: stores, count: stores.length });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getStoreStats: async (req, res) => {
    try {
      const stats = await storeModel.getStats();
      res.json({ success: true, data: stats });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getStoreById: async (req, res) => {
    try {
      const { id } = req.params;
      const store = await storeModel.findById(id);
      if (!store) {
        return res.status(404).json({ success: false, message: 'Store not found' });
      }
      res.json({ success: true, data: store });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  createStore: async (req, res) => {
    try {
      const { name, ownerName, ownerEmail, category, plan, url } = req.body;
      if (!name || !ownerName || !ownerEmail) {
        return res.status(400).json({ success: false, message: 'Missing required store details' });
      }

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newStore = await storeModel.create({
        name,
        slug,
        ownerName,
        ownerEmail,
        category: category || 'General Retail',
        plan: plan || 'Starter',
        url: url || `https://${slug}.brandbloom.store`,
        monthlyRevenue: 0,
        revenueGrowth: 0,
        healthScore: 80
      });

      await activityLogModel.create({
        actor: 'Admin',
        action: 'Store Registered',
        target: newStore.name,
        status: 'success',
        details: `New store registered under owner ${ownerName} (${ownerEmail})`
      });

      await notificationModel.create({
        type: 'system',
        title: 'New Store Registered',
        message: `${newStore.name} has joined BrandBloom on the ${newStore.plan} plan.`,
        link: '/stores',
        priority: 'normal'
      });

      res.status(201).json({ success: true, data: newStore });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  updateStoreStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;

      const validStatuses = ['active', 'declining', 'inactive', 'suspended'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      }

      const updated = await storeModel.updateStatus(id, status);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Store not found' });
      }

      await activityLogModel.create({
        actor: 'Admin',
        action: 'Store Status Updated',
        target: `${updated.name} (Status: ${status})`,
        status: status === 'suspended' ? 'warning' : 'info',
        details: reason || `Admin updated store status to ${status}`
      });

      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  updateStore: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storeModel.update(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Store not found' });
      }
      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  deleteStore: async (req, res) => {
    try {
      const { id } = req.params;
      const store = await storeModel.findById(id);
      if (!store) {
        return res.status(404).json({ success: false, message: 'Store not found' });
      }
      await storeModel.delete(id);
      await activityLogModel.create({
        actor: 'Admin',
        action: 'Store Deleted',
        target: store.name,
        status: 'warning',
        details: `Store ${store.name} (${id}) deleted from database`
      });
      res.json({ success: true, message: 'Store deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
