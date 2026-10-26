import { useQuery } from '@tanstack/react-query'
import { getPost } from '../api/posts.api'
import { queryKeys } from '../api/queryKeys'

export function usePostDetails(postId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.postDetails(postId),
    queryFn: () => getPost(postId),
  })
}
