import { useParams } from 'react-router'
import { useUserProfile } from '../hooks/useUserProfile'
import { useFollowUser } from '../hooks/useFollowUser'
import { useUserPosts } from '../hooks/useUserPosts'
import PostList from '../components/post/PostList'
import ProfileBanner from '../components/profile/ProfileBanner'

export default function UserProfile() {
    
  const { id } = useParams()
  const { user, isFollowing } = useUserProfile(id)
  const followMutation = useFollowUser(id)
  const handleFollow = () => followMutation.mutate(id)
  const isPending = followMutation.isPending
  const { posts } = useUserPosts(id)

if (!user) return null

 return (
 <div className="mx-auto w-full max-w-6xl px-4 py-8">
  <title>{user.name}</title>

  <ProfileBanner
    user={user}
    isFollowing={isFollowing}
    isFollowPending={isPending}
    onFollow={handleFollow}
  />

  <div className="mt-6 flex flex-col gap-6">
    <PostList posts={posts} />
  </div>
</div>
)
}