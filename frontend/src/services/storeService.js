import { request } from './api';

export const storeService = {
  getStores: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/stores${query ? `?${query}` : ''}`);
  },

  getStoreStats: async () => {
    return request('/stores/stats');
  },

  getStoreById: async (id) => {
    return request(`/stores/${id}`);
  },

  createStore: async (storeData) => {
    return request('/stores', {
      method: 'POST',
      body: JSON.stringify(storeData)
    });
  },

  updateStoreStatus: async (id, status, reason = '') => {
    return request(`/stores/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reason })
    });
  },

  updateStore: async (id, storeData) => {
    return request(`/stores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(storeData)
    });
  },

  deleteStore: async (id) => {
    return request(`/stores/${id}`, {
      method: 'DELETE'
    });
  }
};
