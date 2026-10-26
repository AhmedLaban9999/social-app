import { useQuery } from '@tanstack/react-query'
import { getPostComments } from '../api/comments.api'
import { queryKeys } from '../api/queryKeys'
import type { CommentItem } from '../types/comment'

// Comments of one post. Fetches only while `enabled` is true.
// `comments` is null while disabled, even if the cache already has data,
// so each card keeps showing its list only after the user opened it.
export function useComments(postId: string, { enabled }: { enabled: boolean }) {
  const query = useQuery({
    queryKey: queryKeys.comments(postId),
    queryFn: () => getPostComments(postId),
    enabled,
  })

  const comments: CommentItem[] | null = enabled
    ? (query.data?.data.data.comments ?? null)
    : null

  return { ...query, comments }
}
