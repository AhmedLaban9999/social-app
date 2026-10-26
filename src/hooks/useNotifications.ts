import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '../api/notifications.api'
import { queryKeys } from '../api/queryKeys'
import type { Notification } from '../types/Notifications'

export function useNotifications() {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => getNotifications(),
  })

  const notifications: Notification[] = listQuery.data?.data.data.notifications ?? []

  const markRead = useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications })
    },
  })

  const markAllRead = useMutation({
    mutationFn: () => markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications })
    },
  })

  return {
    ...listQuery,
    notifications,
    markRead,
    markAllRead,
  }
}
