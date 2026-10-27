import { Button } from 'flowbite-react'
import dayjs from 'dayjs'
import { Link } from 'react-router'

export interface PostActionsProps {
  postId: string
  likesCount: number
  sharesCount: number
  commentsCount: number
  createdAt: Date | string
  isLiked: boolean
  isLikePending: boolean
  onLike: () => void
  onShareClick: () => void
}

export default function PostActions({
  postId,
  likesCount,
  sharesCount,
  commentsCount,
  createdAt,
  isLiked,
  isLikePending,
  onLike,
  onShareClick,
}: PostActionsProps) {
  return (
    <>
      <div className="px-4 pb-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <i className="fa-regular fa-thumbs-up text-blue-600 dark:text-blue-400"></i> {likesCount} likes
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <i className="fa-solid fa-retweet text-blue-600 dark:text-blue-400"></i> {sharesCount} shares
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <i className="fa-regular fa-comment text-blue-600 dark:text-blue-400"></i> {commentsCount} comments
          </span>
          <Link
            to={'/PostsDetails/' + postId}
            className="ms-auto whitespace-nowrap font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            View details
          </Link>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <i className="fa-regular fa-clock"></i> {dayjs(createdAt).format('MMM D, h:mm A')}
        </p>
      </div>

      <div className="mx-2 sm:mx-4 flex gap-2 border-t border-gray-200 py-2 dark:border-gray-700">
        <Button
          onClick={onLike}
          disabled={isLikePending}
          color="light"
          className={`flex-1 border-0 ${
            isLiked
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-white text-gray-600 dark:bg-transparent dark:text-gray-300'
          } hover:bg-blue-100 dark:hover:bg-gray-700`}
        >
          <i className="fa-regular fa-thumbs-up sm:me-2"></i> <span className="hidden sm:inline">Like</span>
        </Button>
        <Button color="light" className="flex-1 border-0 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-700">
          <i className="fa-regular fa-comment sm:me-2"></i> <span className="hidden sm:inline">Comment</span>
        </Button>
        <Button
          onClick={onShareClick}
          color="light"
          className="flex-1 border-0 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <i className="fa-solid fa-share-nodes sm:me-2"></i> <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </>
  )
}
