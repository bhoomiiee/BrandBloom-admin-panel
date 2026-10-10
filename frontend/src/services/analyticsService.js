import { request } from './api';

export const analyticsService = {
  getOverview: async () => {
    return request('/analytics/overview');
  }
};
