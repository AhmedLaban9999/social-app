import { Dropdown, DropdownItem } from 'flowbite-react'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import type { CommentItem } from '../../types/comment'
import { AuthContext } from '../../context/AuthContext'
import { useCommentActions } from '../../hooks/useCommentActions'
import UserAvatar from '../ui/UserAvatar'
import UserLink from '../ui/UserLink'
import ReplyList from './ReplyList'

interface CommentCardProps {
  comment: CommentItem
  postId: string
}

export default function CommentCard({ comment, postId }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [showReplies, setShowReplies] = useState(false)
  const { userData } = useContext(AuthContext)

  const { editComment, deleteComment, likeComment } = useCommentActions(postId)

  const handleLikeComment = (commentId: string) => {
    likeComment.mutate(commentId)
  }

  const handleDeleteComment = () => {
    deleteComment.mutate(comment._id)
  }

  const handleUpdateComment = () => {
    editComment.mutate(
      { commentId: comment._id, content: editText },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      },
    )
  }

  return (
    <div className="flex items-start gap-3">
      <UserAvatar src={comment.commentCreator.photo} size="sm" userId={comment.commentCreator._id} />

      <div className="min-w-0 flex-1">
        <div className="w-fit max-w-full rounded-2xl bg-gray-100 px-4 py-3 dark:bg-gray-800">
          <UserLink userId={comment.commentCreator._id} className="block text-sm font-bold text-gray-900 dark:text-white">
            {comment.commentCreator.name}
          </UserLink>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            @{comment.commentCreator.username} · {dayjs(comment.createdAt).format('MMM D, h:mm A')}
          </p>
          {comment.image && (
            <img src={comment.image} alt="comment" className="mt-2 max-h-60 rounded-xl object-cover" />
          )}
          {isEditing ? (
            <div className="mt-2">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-full px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateComment}
                  className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-gray-800 dark:text-gray-200">{comment.content}</p>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between ps-1 text-xs">
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
            <span>{dayjs(comment.createdAt).format('MMM D, h:mm A')}</span>
            <button
              onClick={() => handleLikeComment(comment._id)}
              className="font-semibold hover:text-blue-600 dark:hover:text-blue-400"
            >
              Like ({comment.likes.length})
            </button>
            <button
              onClick={() => setShowReplies((prev) => !prev)}
              className="font-semibold hover:text-blue-600 dark:hover:text-blue-400"
            >
              Reply
            </button>
          </div>
          {comment.commentCreator._id === userData?._id && (
            <Dropdown
              inline
              arrowIcon={false}
              label={<i className="fa-solid fa-ellipsis text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"></i>}
            >
              <DropdownItem
                onClick={() => {
                  setIsEditing(true)
                  setEditText(comment.content)
                }}
              >
                <i className="fa-solid fa-pen me-3 w-4"></i> Edit
              </DropdownItem>
              <DropdownItem onClick={handleDeleteComment} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                <i className="fa-regular fa-trash-can me-3 w-4"></i> Delete
              </DropdownItem>
            </Dropdown>
          )}
        </div>

        {(comment.repliesCount > 0 || showReplies) && (
          <button
            onClick={() => setShowReplies((prev) => !prev)}
            className="mt-2 w-fit text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            <i className="fa-solid fa-reply me-1 rotate-180"></i>{' '}
            {showReplies ? 'Hide replies' : `View ${comment.repliesCount} replies`}
          </button>
        )}

        <ReplyList
          postId={postId}
          commentId={comment._id}
          commentAuthorName={comment.commentCreator.name}
          enabled={showReplies}
        />
      </div>
    </div>
  )
}
