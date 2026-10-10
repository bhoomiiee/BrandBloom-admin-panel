import { request } from './api';

export const upgradeService = {
  getUpgrades: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/upgrades${query ? `?${query}` : ''}`);
  },

  getStats: async () => {
    return request('/upgrades/stats');
  },

  getById: async (id) => {
    return request(`/upgrades/${id}`);
  },

  recordOwnerDecision: async (id, decision, notes = '') => {
    return request(`/upgrades/${id}/owner-decision`, {
      method: 'PATCH',
      body: JSON.stringify({ decision, notes })
    });
  },

  applyUpgrade: async (id) => {
    return request(`/upgrades/${id}/apply`, {
      method: 'POST'
    });
  },

  rollbackUpgrade: async (id, reason = '') => {
    return request(`/upgrades/${id}/rollback`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
  }
};
