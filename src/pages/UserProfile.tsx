import { useParams } from 'react-router'
import { useUserProfile } from '../hooks/useUserProfile'
import { useFollowUser } from '../hooks/useFollowUser'
import { useUserPosts } from '../hooks/useUserPosts'
import UserAvatar from '../components/ui/UserAvatar'
import PostList from '../components/post/PostList'

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

  <div className="w-full overflow-hidden rounded-3xl bg-white shadow-sm">

    <div
      className="h-56 bg-linear-to-r from-slate-800 via-blue-900 to-sky-500 bg-cover bg-center"
      style={user.cover ? { backgroundImage: `url(${user.cover})` } : undefined}
    ></div>

    <div className="relative mx-4 -mt-20 mb-6 rounded-3xl bg-white/90 p-6 backdrop-blur md:mx-10">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
   
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-start">
          <div className="rounded-full border-4 border-white bg-white shadow-sm">
            <UserAvatar src={user.photo} size="xl" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
            <p className="text-lg text-gray-500">@{user.username}</p>
          </div>
        </div>

      
        <button
          onClick={() => handleFollow()}
          disabled={isPending}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold disabled:opacity-60 ${
            isFollowing ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <i className={`fa-solid ${isFollowing ? 'fa-user-check' : 'fa-user-plus'}`}></i>
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  </div>

  <div className="mt-6 flex flex-col gap-6">
    <PostList posts={posts} />
  </div>
</div>
)
}