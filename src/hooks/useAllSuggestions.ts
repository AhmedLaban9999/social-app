import { useInfiniteQuery } from '@tanstack/react-query'
import { getSuggestions } from '../api/users.api'
import { queryKeys } from '../api/queryKeys'
import type { Friend } from '../types/Friends'

export function useAllSuggestions(search: string, limit = 20) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.allSuggestions(search),
    queryFn: ({ pageParam }) => getSuggestions(search, limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.meta.pagination.nextPage,
  })

  const friends: Friend[] =
    query.data?.pages.flatMap((page) => page.data.data.suggestions) ?? []

  return { ...query, friends }
}
