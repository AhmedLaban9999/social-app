import { useContext, useState } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import type { Post } from '../types/posts'
import CreatePost from '../components/post/CreatePost'
import SuggestedFriends from '../components/friends/SuggestedFriends'
import { usePosts } from '../hooks/usePosts'
import { useUserPosts } from '../hooks/useUserPosts'
import { useBookmarks } from '../hooks/useBookmarks'
import PageLoader from '../components/ui/PageLoader'
import ErrorState from '../components/ui/ErrorState'
import TabBar from '../components/ui/TabBar'
import PostList from '../components/post/PostList'

const tabs = [
  { key: 'feed', label: 'Feed', icon: 'fa-regular fa-newspaper' },
  { key: 'myposts', label: 'My Posts', icon: 'fa-solid fa-wand-magic-sparkles' },
  { key: 'community', label: 'Community', icon: 'fa-solid fa-earth-americas' },
  { key: 'saved', label: 'Saved', icon: 'fa-regular fa-bookmark' },
]

export default function Feed() {
  const [activeTab, setActiveTab] = useState('feed')
  const { userData } = useContext(AuthContext)

  const { isError, isLoading, data, error, refetch } = usePosts()
  const { posts: myposts } = useUserPosts(userData?._id, { enabled: !!userData })
  const { bookmarks: savedPosts } = useBookmarks({ enabled: !!userData })

  if (isLoading) {
    return <PageLoader variant="dots" size={80} fullScreen />
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || 'Failed to load posts'}
        onRetry={() => refetch()}
      />
    )
  }

  const postslist: Post[] = data?.data.data.posts
  let shownPosts = postslist
  if (activeTab === 'myposts') shownPosts = myposts
  if (activeTab === 'saved') shownPosts = savedPosts

  const emptyMessage =
    activeTab === 'saved'
      ? 'No saved posts yet.'
      : activeTab === 'myposts'
        ? "You haven't posted yet."
        : 'No posts yet.'

  return (
    <>
      <title>Feed</title>
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-2 py-6 sm:px-4 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_340px]">
        <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} variant="sidebar" />

        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-3 xl:hidden">
            <div className="lg:hidden">
              <TabBar
                tabs={tabs}
                active={activeTab}
                onChange={setActiveTab}
                variant="pills"
                className="mt-0"
              />
            </div>
            <Link
              to="/Suggestions"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              <i aria-hidden="true" className="fa-solid fa-user-group"></i> See friend suggestions
            </Link>
          </div>

          {userData && <CreatePost name={userData.name} photo={userData.photo} />}
          <PostList posts={shownPosts} emptyMessage={emptyMessage} />
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <SuggestedFriends />
          </div>
        </aside>
      </div>
    </>
  )
}
