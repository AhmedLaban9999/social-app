import { useQuery } from '@tanstack/react-query'
import { getUnreadCount } from '../api/notifications.api'
import { queryKeys } from '../api/queryKeys'

export function useUnreadCount(options?: { enabled?: boolean }) {
  const query = useQuery({
    queryKey: queryKeys.unreadCount,
    queryFn: () => getUnreadCount(),
    ...(options?.enabled !== undefined ? { enabled: options.enabled } : {}),
  })

  const unreadCount: number = query.data?.data.data.unreadCount ?? 0

  return { ...query, unreadCount }
}
