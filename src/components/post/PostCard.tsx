import { Card } from 'flowbite-react'
import { useContext, useState } from 'react'
import type { Post } from '../../types/posts'
import { AuthContext } from '../../context/AuthContext'
import { usePostActions } from '../../hooks/usePostActions'
import PhotoLightbox from '../profile/PhotoLightbox'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'
import PostEditForm from './PostEditForm'
import SharedPostPreview from './SharedPostPreview'

export interface PostCardProps {
  element: Post
}

export default function PostCard({ element }: PostCardProps) {
  const { userData } = useContext(AuthContext)
  const {
    sharedPost,
    _id,
    image,
    body,
    createdAt,
    bookmarked,
    user: { name, photo, _id: userId },
  } = element

  const { deletePost, editPost, toggleBookmark } = usePostActions(_id)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [showLightbox, setShowLightbox] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const imageAlt = body?.trim() || 'Post image'

  const handleUpdate = () =>
    editPost.mutate(editText, { onSuccess: () => setIsEditing(false) })

  return (
    <Card
      className="w-full overflow-hidden"
      theme={{ root: { children: 'flex flex-col p-0' } }}
    >
      <PostHeader
        userId={userId}
        name={name}
        photo={photo}
        createdAt={createdAt}
        bookmarked={bookmarked}
        isOwner={userId === userData?._id}
        onToggleBookmark={() => toggleBookmark.mutate()}
        onEdit={() => {
          setIsEditing(true)
          setEditText(body ?? '')
        }}
        onDelete={() => deletePost.mutate()}
      />

      {isEditing ? (
        <PostEditForm
          value={editText}
          onChange={setEditText}
          onSave={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isPending={editPost.isPending}
        />
      ) : (
        body && <p className="px-4 pb-3 text-gray-800 dark:text-gray-200">{body}</p>
      )}

      {image && (
        <>
          <button
            type="button"
            aria-label="View image"
            onClick={() => setShowLightbox(true)}
            className={`block w-full cursor-zoom-in bg-gray-50 dark:bg-gray-900 ${
              imgLoaded ? '' : 'min-h-48 animate-pulse'
            }`}
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              className="max-h-[420px] w-full object-contain sm:max-h-[520px]"
            />
          </button>
          <PhotoLightbox
            src={image}
            alt={imageAlt}
            open={showLightbox}
            onClose={() => setShowLightbox(false)}
          />
        </>
      )}

      {sharedPost && <SharedPostPreview sharedPost={sharedPost} />}

      <PostFooter postdetail={element} />
    </Card>
  )
}
