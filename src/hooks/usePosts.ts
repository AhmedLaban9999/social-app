import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api/posts.api'
import { queryKeys } from '../api/queryKeys'

// The main feed, key ['newposts'].
export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => getPosts(),
  })
}
