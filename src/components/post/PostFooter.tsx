import { useContext, useState } from 'react'
import type { Post } from '../../types/posts'
import { AuthContext } from '../../context/AuthContext'
import { usePostActions } from '../../hooks/usePostActions'
import CommentSection from '../comment/CommentSection'
import PostActions from './PostActions'
import TopCommentPreview from './TopCommentPreview'
import ShareModal from './ShareModal'

export default function PostFooter({ postdetail }: { postdetail: Post }) {
  const { userData } = useContext(AuthContext)
  const { likesCount, commentsCount, sharesCount, topComment, _id, likes, createdAt } = postdetail
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)

  const { toggleLike, sharePost } = usePostActions(_id)

  const handleShare = (text: string) => {
    sharePost.mutate(text, {
      onSuccess: () => {
        setShowShare(false)
      },
    })
  }

  return (
    <>
      <PostActions
        postId={_id}
        likesCount={likesCount}
        sharesCount={sharesCount}
        commentsCount={commentsCount}
        createdAt={createdAt}
        isLiked={Boolean(userData && likes.includes(userData._id))}
        isLikePending={toggleLike.isPending}
        onLike={() => toggleLike.mutate()}
        onShareClick={() => setShowShare(true)}
      />

      {topComment && !showComments && (
        <TopCommentPreview
          topComment={topComment}
          onViewAll={() => setShowComments(true)}
        />
      )}

      <CommentSection postId={_id} enabled={showComments} />

      <ShareModal
        open={showShare}
        onClose={() => setShowShare(false)}
        onShare={handleShare}
        isPending={sharePost.isPending}
      />
    </>
  )
}
