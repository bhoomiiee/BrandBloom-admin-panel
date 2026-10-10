import { recommendationModel } from '../models/recommendationModel.js';
import { storeModel } from '../models/storeModel.js';
import { upgradeModel } from '../models/upgradeModel.js';
import { aiEngineService } from '../services/aiEngineService.js';
import { activityLogModel } from '../models/activityLogModel.js';
import { notificationModel } from '../models/notificationModel.js';

export const recommendationController = {
  getRecommendations: async (req, res) => {
    try {
      const { storeId, priority, status, category, search } = req.query;
      const recs = await recommendationModel.findAll({ storeId, priority, status, category, search });
      res.json({ success: true, data: recs, count: recs.length });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getRecommendationStats: async (req, res) => {
    try {
      const stats = await recommendationModel.getStats();
      res.json({ success: true, data: stats });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getRecommendationById: async (req, res) => {
    try {
      const { id } = req.params;
      const rec = await recommendationModel.findById(id);
      if (!rec) {
        return res.status(404).json({ success: false, message: 'Recommendation not found' });
      }
      res.json({ success: true, data: rec });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  generateRecommendation: async (req, res) => {
    try {
      const { storeId } = req.body;
      if (!storeId) {
        return res.status(400).json({ success: false, message: 'storeId is required' });
      }

      const newRec = await aiEngineService.analyzeStoreAndGenerateRecommendation(storeId);
      res.status(201).json({
        success: true,
        message: 'AI Recommendation generated successfully based on store diagnostics',
        data: newRec
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'reviewed', 'pushed_to_owner', 'implemented', 'dismissed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: `Invalid status. Valid values: ${validStatuses.join(', ')}` });
      }

      const updated = await recommendationModel.updateStatus(id, status);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Recommendation not found' });
      }

      await activityLogModel.create({
        actor: 'Admin',
        action: 'Recommendation Status Updated',
        target: `${updated.title} -> ${status}`,
        details: `Updated status for recommendation ${id}`
      });

      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  pushToOwner: async (req, res) => {
    try {
      const { id } = req.params;
      const rec = await recommendationModel.findById(id);
      if (!rec) {
        return res.status(404).json({ success: false, message: 'Recommendation not found' });
      }

      const store = await storeModel.findById(rec.storeId);

      const previewData = {
        summary: `Proposed AI Optimization: ${rec.title}`,
        beforeSnippet: `<!-- Existing Storefront Implementation -->\n<section class="legacy-component">\n  <!-- High friction or unoptimized layout -->\n  <p>Standard static layout</p>\n</section>`,
        afterSnippet: `<!-- BrandBloom AI Enhanced Implementation -->\n<section class="bloom-optimized-module" data-version="2.4">\n  <div class="express-flow active">\n    <!-- ${rec.suggestedImprovement} -->\n  </div>\n</section>`,
        featuresAdded: [
          rec.suggestedImprovement,
          'Real-time telemetry tracking & safe sandbox isolation',
          'Automated instant rollback guard'
        ],
        beforeMetrics: { issue: rec.identifiedIssue },
        projectedMetrics: { impact: rec.expectedImpact, score: `${rec.impactScore}/100` }
      };

      const upgradeReq = await upgradeModel.create({
        storeId: rec.storeId,
        storeName: rec.storeName,
        recommendationId: rec.id,
        title: rec.title,
        description: `${rec.identifiedIssue} Proposed solution: ${rec.suggestedImprovement}`,
        category: rec.category,
        ownerApprovalStatus: 'Pending Approval',
        implementationStatus: 'Pending Approval',
        previewData
      });

      await recommendationModel.linkUpgradeRequest(rec.id, upgradeReq.id);

      await activityLogModel.create({
        actor: 'Admin',
        action: 'Upgrade Proposal Pushed to Owner',
        target: `${rec.title} -> ${store ? store.ownerName : 'Store Owner'}`,
        status: 'info',
        details: `Created Upgrade Request #${upgradeReq.id} awaiting owner approval`
      });

      await notificationModel.create({
        type: 'upgrade',
        title: 'Upgrade Proposal Dispatched',
        message: `Dispatched "${rec.title}" to ${rec.storeName} owner. Waiting for approval.`,
        link: '/upgrades',
        priority: 'high'
      });

      res.status(201).json({
        success: true,
        message: 'Upgrade proposal successfully dispatched to store owner',
        data: upgradeReq
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
