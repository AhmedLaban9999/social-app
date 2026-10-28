import { useState } from 'react'
import { Link } from 'react-router'
import type { Post } from '../../types/posts'
import PhotoLightbox from '../profile/PhotoLightbox'
import UserAvatar from '../ui/UserAvatar'
import UserLink from '../ui/UserLink'

export interface SharedPostPreviewProps {
  sharedPost: Post
}

export default function SharedPostPreview({ sharedPost }: SharedPostPreviewProps) {
  const [showLightbox, setShowLightbox] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const imageAlt = sharedPost.body?.trim() || 'Post image'

  return (
    <div className="mx-4 mb-3 overflow-hidden rounded-2xl border border-gray-200 bg-slate-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <UserAvatar src={sharedPost.user.photo} size="sm" userId={sharedPost.user._id} />
          <div>
            <UserLink
              userId={sharedPost.user._id}
              className="block text-sm font-bold text-gray-900 dark:text-white"
            >
              {sharedPost.user.name}
            </UserLink>
            <p className="text-xs text-gray-500 dark:text-gray-400">@{sharedPost.user.username}</p>
          </div>
        </div>
        <Link
          to={`/PostsDetails/${sharedPost._id}`}
          className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          Original Post <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
        </Link>
      </div>
      {sharedPost.body && <p className="px-4 pb-3 text-gray-800 dark:text-gray-200">{sharedPost.body}</p>}
      {sharedPost.image && (
        <>
          <button
            type="button"
            aria-label="View image"
            onClick={() => setShowLightbox(true)}
            className={`block w-full cursor-zoom-in bg-gray-50 dark:bg-gray-900 ${
              imgLoaded ? '' : 'min-h-40 animate-pulse'
            }`}
          >
            <img
              src={sharedPost.image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              className="max-h-[320px] w-full object-contain"
            />
          </button>
          <PhotoLightbox
            src={sharedPost.image}
            alt={imageAlt}
            open={showLightbox}
            onClose={() => setShowLightbox(false)}
          />
        </>
      )}
    </div>
  )
}
