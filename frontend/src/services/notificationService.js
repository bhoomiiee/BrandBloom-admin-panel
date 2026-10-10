import { request } from './api';

export const notificationService = {
  getNotifications: async () => {
    return request('/notifications');
  },

  markAsRead: async (id) => {
    return request(`/notifications/${id}/read`, {
      method: 'PATCH'
    });
  },

  markAllAsRead: async () => {
    return request('/notifications/mark-all-read', {
      method: 'POST'
    });
  },

  getActivityLogs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/notifications/activity-logs${query ? `?${query}` : ''}`);
  }
};
