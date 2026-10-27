import type { TopComment } from '../../types/posts'
import UserAvatar from '../ui/UserAvatar'
import UserLink from '../ui/UserLink'

export interface TopCommentPreviewProps {
  topComment: TopComment
  onViewAll: () => void
}

export default function TopCommentPreview({ topComment, onViewAll }: TopCommentPreviewProps) {
  return (
    <div className="mx-4 mb-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400">Top comment</p>
      <div className="flex items-start gap-3">
        <UserAvatar
          src={topComment.commentCreator.photo}
          size="sm"
          userId={topComment.commentCreator._id}
        />
        <div className="flex-1 rounded-2xl bg-white px-4 py-2 dark:bg-gray-700">
          <UserLink
            userId={topComment.commentCreator._id}
            className="block text-sm font-bold text-gray-900 dark:text-white"
          >
            {topComment.commentCreator.name}
          </UserLink>
          <p className="text-gray-700 dark:text-gray-200">{topComment.content}</p>
        </div>
      </div>
      <button
        onClick={onViewAll}
        className="mt-3 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
      >
        View all comments
      </button>
    </div>
  )
}
