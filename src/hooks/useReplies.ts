import { useQuery } from '@tanstack/react-query'
import { getReplies } from '../api/comments.api'
import { queryKeys } from '../api/queryKeys'
import type { CommentItem } from '../types/comment'

// Replies of one comment, key ['replies', commentId]. Fetches only while `enabled`.
export function useReplies(postId: string, commentId: string, { enabled }: { enabled: boolean }) {
  const query = useQuery({
    queryKey: queryKeys.replies(commentId),
    queryFn: () => getReplies(postId, commentId),
    enabled,
  })

  const replies: CommentItem[] = query.data?.data.data.replies ?? []

  return { ...query, replies }
}
