import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '../api/users.api'
import { queryKeys } from '../api/queryKeys'
import type { User1 } from '../types/posts'

export function useUserProfile(userId: string | undefined) {
  const query = useQuery({
    queryKey: queryKeys.profile(userId),
    queryFn: () => getUserProfile(userId),
  })

  const user: User1 | undefined = query.data?.data.data.user
  const isFollowing: boolean = query.data?.data.data.isFollowing ?? false

  return { ...query, user, isFollowing }
}
