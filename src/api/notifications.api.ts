import { api } from './client'

export function getNotifications() {
  return api.get('/notifications?&page=1&limit=10')
}

export function getUnreadCount() {
  return api.get('/notifications/unread-count')
}

export function markNotificationRead(notificationId: string) {
  return api.patch(`/notifications/${notificationId}/read`, {})
}

export function markAllNotificationsRead() {
  return api.patch('/notifications/read-all', {})
}
