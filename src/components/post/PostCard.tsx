import { Card } from 'flowbite-react'
import { useContext, useState } from 'react'
import type { Post } from '../../types/posts'
import { AuthContext } from '../../context/AuthContext'
import { usePostActions } from '../../hooks/usePostActions'
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

      {image && <img src={image} alt="post" className="w-full object-cover" />}

      {sharedPost && <SharedPostPreview sharedPost={sharedPost} />}

      <PostFooter postdetail={element} />
    </Card>
  )
}
