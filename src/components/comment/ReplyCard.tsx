import dayjs from 'dayjs'
import type { CommentItem } from '../../types/comment'
import UserAvatar from '../ui/UserAvatar'
import UserLink from '../ui/UserLink'

export interface ReplyCardProps {
  reply: CommentItem
}

export default function ReplyCard({ reply }: ReplyCardProps) {
  return (
    <div className="flex items-start gap-2">
      <UserAvatar src={reply.commentCreator.photo} size="xs" userId={reply.commentCreator._id} />
      <div className="min-w-0 flex-1">
        <div className="w-fit max-w-full rounded-2xl bg-gray-100 px-3 py-2">
          <UserLink userId={reply.commentCreator._id} className="block text-xs font-bold text-gray-900">
            {reply.commentCreator.name}
          </UserLink>
          <p className="text-sm text-gray-800">{reply.content}</p>
        </div>
        <div className="mt-1 flex items-center gap-4 ps-1 text-xs text-gray-500">
          <span>{dayjs(reply.createdAt).format('MMM D, h:mm A')}</span>
          <button className="font-semibold hover:text-blue-600">Like ({reply.likes.length})</button>
        </div>
      </div>
    </div>
  )
}
