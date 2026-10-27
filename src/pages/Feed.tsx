
import {useContext ,useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import type { Post } from '../types/posts'
import CreatePost from '../components/post/CreatePost'
import SuggestedFriends from '../components/friends/SuggestedFriends';
import { usePosts } from '../hooks/usePosts'
import { useUserPosts } from '../hooks/useUserPosts'
import { useBookmarks } from '../hooks/useBookmarks'
import PageLoader from '../components/ui/PageLoader'
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

  const { isError, isLoading, data, error } = usePosts()
  const { posts: myposts } = useUserPosts(userData?._id, { enabled: !!userData })
  const { bookmarks: savedPosts } = useBookmarks({ enabled: !!userData })

  if (isLoading) {
    return <PageLoader variant="dots" size={80} />
  }

  if (isError) {
    return <h2 className="text-red-400">{error?.message}</h2>
  }

  const postslist: Post[] = data?.data.data.posts
let shownPosts = postslist
if (activeTab === 'myposts') shownPosts = myposts
if (activeTab === 'saved') shownPosts = savedPosts
return (<> <title>Feed</title>
  <div className="mx-auto grid w-full  max-w-7xl gap-6 px-2 sm:px-4 py-6 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_340px]">
 
  <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} variant="sidebar" />

  
    <div className="flex min-w-0 flex-col gap-6 ">
   {userData && <CreatePost name={userData.name} photo={userData.photo} />}
   <PostList posts={shownPosts} />
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
