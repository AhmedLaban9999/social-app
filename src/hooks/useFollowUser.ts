import { useMutation, useQueryClient } from '@tanstack/react-query'
import { followUser as followUserApi } from '../api/users.api'
import { queryKeys } from '../api/queryKeys'

// Used by SuggestedFriends (passes userId to mutate(userId))
// and UserProfile (can pass profileUserId to the hook or to mutate).
export function useFollowUser(profileUserId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId?: string) => followUserApi(userId ?? profileUserId),
    onSuccess: (_data, variables) => {
      const targetId = variables ?? profileUserId
      if (profileUserId !== undefined) {
        queryClient.invalidateQueries({ queryKey: queryKeys.profile(targetId) })
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.suggestionsAll })
    },
  })
}
