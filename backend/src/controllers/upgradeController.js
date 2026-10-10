import { upgradeModel } from '../models/upgradeModel.js';
import { recommendationModel } from '../models/recommendationModel.js';
import { activityLogModel } from '../models/activityLogModel.js';
import { notificationModel } from '../models/notificationModel.js';

export const upgradeController = {
  getUpgrades: async (req, res) => {
    try {
      const { storeId, implementationStatus, ownerApprovalStatus, search } = req.query;
      const upgrades = await upgradeModel.findAll({ storeId, implementationStatus, ownerApprovalStatus, search });
      res.json({ success: true, data: upgrades, count: upgrades.length });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getUpgradeStats: async (req, res) => {
    try {
      const stats = await upgradeModel.getStats();
      res.json({ success: true, data: stats });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getUpgradeById: async (req, res) => {
    try {
      const { id } = req.params;
      const upgrade = await upgradeModel.findById(id);
      if (!upgrade) {
        return res.status(404).json({ success: false, message: 'Upgrade request not found' });
      }
      res.json({ success: true, data: upgrade });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  recordOwnerDecision: async (req, res) => {
    try {
      const { id } = req.params;
      const { decision, notes } = req.body;

      if (!['Approved', 'Rejected'].includes(decision)) {
        return res.status(400).json({ success: false, message: "Decision must be either 'Approved' or 'Rejected'" });
      }

      const upgrade = await upgradeModel.findById(id);
      if (!upgrade) {
        return res.status(404).json({ success: false, message: 'Upgrade request not found' });
      }

      const updated = await upgradeModel.updateOwnerDecision(id, decision, notes);

      await activityLogModel.create({
        actor: `${updated.storeName} Owner`,
        action: `Upgrade ${decision}`,
        target: `${updated.title} (#${updated.id})`,
        status: decision === 'Approved' ? 'success' : 'warning',
        details: notes || `Store owner set decision to ${decision}`
      });

      await notificationModel.create({
        type: 'approval',
        title: `Owner ${decision} Upgrade Request`,
        message: `Store owner for ${updated.storeName} has ${decision.toLowerCase()} "${updated.title}".`,
        link: '/upgrades',
        priority: decision === 'Approved' ? 'high' : 'normal'
      });

      res.json({ success: true, message: `Owner decision recorded: ${decision}`, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  applyUpgrade: async (req, res) => {
    try {
      const { id } = req.params;
      const upgrade = await upgradeModel.findById(id);

      if (!upgrade) {
        return res.status(404).json({ success: false, message: 'Upgrade request not found' });
      }

      if (upgrade.ownerApprovalStatus !== 'Approved') {
        return res.status(403).json({
          success: false,
          message: `Cannot apply website upgrade: Store owner has not approved this change yet. Current status: "${upgrade.ownerApprovalStatus}". BrandBloom policy strictly mandates owner authorization.`
        });
      }

      if (upgrade.implementationStatus === 'Completed') {
        return res.status(400).json({ success: false, message: 'This upgrade has already been applied.' });
      }

      await upgradeModel.updateImplementationStatus(id, 'In Progress', 'Live build & sandbox verification initiated');

      const completed = await upgradeModel.updateImplementationStatus(
        id,
        'Completed',
        'Website changes successfully verified and injected into live merchant storefront via simulation engine'
      );

      if (completed.recommendationId) {
        await recommendationModel.updateStatus(completed.recommendationId, 'implemented');
      }

      await activityLogModel.create({
        actor: 'Admin / Deployment Engine',
        action: 'Website Upgrade Deployed',
        target: `${completed.title} (${completed.storeName})`,
        status: 'success',
        details: 'Simulated website enhancement successfully activated. Verification tests passed.'
      });

      await notificationModel.create({
        type: 'upgrade',
        title: 'Upgrade Deployed Successfully',
        message: `"${completed.title}" has been applied to ${completed.storeName}.`,
        link: '/upgrades',
        priority: 'high'
      });

      res.json({
        success: true,
        message: 'Website upgrade changes successfully deployed to merchant store (Simulation mode active)',
        data: completed
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  rollbackUpgrade: async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const upgrade = await upgradeModel.findById(id);
      if (!upgrade) {
        return res.status(404).json({ success: false, message: 'Upgrade request not found' });
      }

      if (upgrade.implementationStatus !== 'Completed') {
        return res.status(400).json({ success: false, message: 'Can only rollback completed upgrades.' });
      }

      const updated = await upgradeModel.updateImplementationStatus(
        id,
        'Approved',
        `Changes rolled back by Admin. Reason: ${reason || 'Reverted to previous revision'}`
      );

      await activityLogModel.create({
        actor: 'Admin',
        action: 'Upgrade Rolled Back',
        target: `${updated.title} (${updated.storeName})`,
        status: 'warning',
        details: reason || 'Storefront reverted to pre-upgrade snapshot'
      });

      await notificationModel.create({
        type: 'alert',
        title: 'Upgrade Reverted',
        message: `"${updated.title}" was rolled back for ${updated.storeName}.`,
        link: '/upgrades',
        priority: 'normal'
      });

      res.json({ success: true, message: 'Upgrade successfully rolled back to previous snapshot', data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
