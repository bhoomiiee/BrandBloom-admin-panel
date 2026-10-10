import { request } from './api';

export const recommendationService = {
  getRecommendations: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/recommendations${query ? `?${query}` : ''}`);
  },

  getStats: async () => {
    return request('/recommendations/stats');
  },

  getById: async (id) => {
    return request(`/recommendations/${id}`);
  },

  generateRecommendation: async (storeId) => {
    return request('/recommendations/generate', {
      method: 'POST',
      body: JSON.stringify({ storeId })
    });
  },

  updateStatus: async (id, status) => {
    return request(`/recommendations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  pushToOwner: async (id) => {
    return request(`/recommendations/${id}/push-to-owner`, {
      method: 'POST'
    });
  }
};
