import { storeModel } from '../models/storeModel.js';
import { recommendationModel } from '../models/recommendationModel.js';
import { activityLogModel } from '../models/activityLogModel.js';
import { notificationModel } from '../models/notificationModel.js';

export const aiEngineService = {
  analyzeStoreAndGenerateRecommendation: async (storeId) => {
    const store = await storeModel.findById(storeId);
    if (!store) {
      throw new Error(`Store with id ${storeId} not found`);
    }

    const { bounceRate, conversionRate, revenueGrowth, category, name } = store;

    let title = '';
    let categoryTag = 'UX & Performance';
    let priority = 'Medium';
    let identifiedIssue = '';
    let supportingMetrics = {};
    let suggestedImprovement = '';
    let expectedImpact = '';
    let impactScore = 80;
    let effort = 'Low';

    if (bounceRate > 55) {
      title = `Mobile Above-The-Fold Overhaul & Instant Page Speed Booster`;
      categoryTag = 'Landing Page & UX';
      priority = 'High';
      identifiedIssue = `Elevated bounce rate of ${bounceRate}% detected on mobile landing pages. Heavy script execution and visual clutter delay user interaction.`;
      supportingMetrics = {
        bounceRate: `${bounceRate}% (benchmark: <42%)`,
        mobileTraffic: '64% of visitors',
        avgSessionDuration: '42 seconds'
      };
      suggestedImprovement = `Optimize LCP image assets with modern WebP delivery, defer non-critical analytics, and introduce an engaging hero benefit badge with a clear primary CTA.`;
      expectedImpact = `-18% Bounce Rate, +22% dwell time, projected +₹1,50,000/mo revenue`;
      impactScore = 88;
      effort = 'Low';
    } else if (conversionRate < 2.0 || revenueGrowth < -10) {
      title = `Smart Cart Abandonment Recovery & Multi-Payment Express Flow`;
      categoryTag = 'Checkout Optimization';
      priority = 'High';
      identifiedIssue = `Conversion rate is currently ${conversionRate}% with revenue trend down ${revenueGrowth}%. Drop-off concentrated at the final billing stage.`;
      supportingMetrics = {
        conversionRate: `${conversionRate}% (target: >2.8%)`,
        cartAbandonmentRate: '71.4%',
        checkoutSteps: '4 separate screens'
      };
      suggestedImprovement = `Deploy single-page checkout accordion with 1-click UPI, Google Pay, and automatic address autofill.`;
      expectedImpact = `+19.5% Checkout Completion, recovering ~₹2,60,000 in monthly abandoned carts`;
      impactScore = 93;
      effort = 'Medium';
    } else {
      title = `Dynamic Social Proof Carousel & AI Product Recommendations`;
      categoryTag = 'Social Proof & Cross-Sell';
      priority = 'Medium';
      identifiedIssue = `Average cart size is steady, but repeat cross-sell discovery is low. Visitors explore only 1.4 pages per session.`;
      supportingMetrics = {
        pagesPerSession: '1.4',
        crossSellTakeRate: '3.8%',
        monthlyRevenue: `₹${store.monthlyRevenue.toLocaleString('en-IN')}`
      };
      suggestedImprovement = `Inject live 'Frequently Bought Together' bundle recommendations on product detail pages and verified photo review badge.`;
      expectedImpact = `+14% Average Order Value (AOV), +8% repeat purchase frequency`;
      impactScore = 82;
      effort = 'Low';
    }

    const newRec = await recommendationModel.create({
      storeId: store.id,
      storeName: store.name,
      title,
      category: categoryTag,
      priority,
      identifiedIssue,
      supportingMetrics,
      suggestedImprovement,
      expectedImpact,
      impactScore,
      effort
    });

    await activityLogModel.create({
      actor: 'AI Optima-v2 Engine',
      action: 'Recommendation Generated',
      target: `${newRec.title} (${name})`,
      details: `Generated priority ${priority} recommendation with impact score ${impactScore}`
    });

    await notificationModel.create({
      type: 'alert',
      title: 'New AI Recommendation Generated',
      message: `AI identified improvement opportunity for ${name}: "${title}"`,
      link: '/recommendations',
      priority: priority === 'High' ? 'high' : 'normal'
    });

    return newRec;
  }
};
