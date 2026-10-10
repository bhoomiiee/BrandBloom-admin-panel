import { request } from './api';

export const settingsService = {
  getSettings: async () => {
    return request('/settings');
  },

  updateSettings: async (settingsData) => {
    return request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData)
    });
  }
};
