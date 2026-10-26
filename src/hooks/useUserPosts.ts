import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '../api/users.api'
import { queryKeys } from '../api/queryKeys'
import type { Post } from '../types/posts'

export function useUserPosts(userId: string | undefined, options?: { enabled?: boolean }) {
  const query = useQuery({
    queryKey: queryKeys.userPosts(userId),
    queryFn: () => getUserPosts(userId),
    ...(options?.enabled !== undefined ? { enabled: options.enabled } : {}),
  })

  const posts: Post[] = query.data?.data.data.posts ?? []

  return { ...query, posts }
}
