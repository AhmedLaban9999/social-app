import { useQuery } from '@tanstack/react-query'
import { getBookmarks } from '../api/users.api'
import { queryKeys } from '../api/queryKeys'
import type { Post } from '../types/posts'

export function useBookmarks(options?: { enabled?: boolean }) {
  const query = useQuery({
    queryKey: queryKeys.bookmarks,
    queryFn: () => getBookmarks(),
    ...(options?.enabled !== undefined ? { enabled: options.enabled } : {}),
  })

  const bookmarks: Post[] = query.data?.data.data.bookmarks ?? []

  return { ...query, bookmarks }
}
