import { useReplies } from '../../hooks/useReplies'
import ReplyCard from './ReplyCard'
import ReplyCreator from './ReplyCreator'

export interface ReplyListProps {
  postId: string
  commentId: string
  commentAuthorName: string
  enabled: boolean
}

export default function ReplyList({
  postId,
  commentId,
  commentAuthorName,
  enabled,
}: ReplyListProps) {
  const { replies } = useReplies(postId, commentId, { enabled })

  if (!enabled) return null

  return (
    <div className="mt-2 flex flex-col gap-3 border-s-2 border-gray-200 ps-4">
      {replies.map((reply) => (
        <ReplyCard key={reply._id} reply={reply} />
      ))}

      <ReplyCreator
        postId={postId}
        commentId={commentId}
        replyToName={commentAuthorName}
        autoFocus={enabled}
      />
    </div>
  )
}
