import { useQuery } from '@tanstack/react-query'
import { getSuggestions } from '../api/users.api'
import { queryKeys } from '../api/queryKeys'
import type { Friend } from '../types/Friends'

export function useSuggestions(search: string, limit = 5) {
  const query = useQuery({
    queryKey: queryKeys.suggestions(search),
    queryFn: () => getSuggestions(search, limit),
  })

  const friends: Friend[] = query.data?.data.data.suggestions ?? []

  return { ...query, friends }
}
