import { useContext,useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useUserPosts } from '../hooks/useUserPosts'
import { useBookmarks } from '../hooks/useBookmarks'
import { useProfileUpload } from '../hooks/useProfileUpload'
import TabBar from '../components/ui/TabBar'
import PostList from '../components/post/PostList'
import ProfileBanner from '../components/profile/ProfileBanner'
import PhotoLightbox from '../components/profile/PhotoLightbox'

const profileTabs = [
  { key: 'posts', label: 'My Posts', icon: 'fa-regular fa-file-lines' },
  { key: 'saved', label: 'Saved', icon: 'fa-regular fa-bookmark' },
]


export default function Profile() {


  const { userData, setUserData } = useContext(AuthContext)
  const { posts: myposts } = useUserPosts(userData?._id, { enabled: !!userData })
  const [activeTab, setActiveTab] = useState('posts')
  const [showPhoto, setShowPhoto] = useState(false)
  const { uploadPhoto, uploadCover } = useProfileUpload({
    onPhotoSuccess: (photo) => {
      if (userData) setUserData({ ...userData, photo })
    },
    onCoverSuccess: (cover) => {
      if (userData) setUserData({ ...userData, cover })
    },
  })
  const mutate = (file: File) => uploadPhoto.mutate(file)
  const handlecover = (file: File) => uploadCover.mutate(file)
  const { bookmarks } = useBookmarks({ enabled: !!userData })
  if (!userData) return null


  return ( <>
   <title>Profile</title>
    <div className="mx-auto w-full max-w-6xl px-2 py-8 sm:px-4">
      <ProfileBanner
        user={userData}
        editable
        onPhotoChange={mutate}
        onCoverChange={handlecover}
        onPhotoClick={() => setShowPhoto(true)}
        myPostsCount={myposts.length}
        bookmarksCount={bookmarks.length}
      />

      <PhotoLightbox
        src={userData.photo}
        alt={userData.name}
        open={showPhoto}
        onClose={() => setShowPhoto(false)}
      />

<TabBar
  tabs={profileTabs}
  active={activeTab}
  onChange={setActiveTab}
  badge={activeTab === 'posts' ? myposts.length : bookmarks.length}
/>

<div className="mt-6 flex flex-col gap-6">
  <PostList
    posts={activeTab === 'posts' ? myposts : bookmarks}
    emptyMessage={activeTab === 'saved' ? 'No saved posts yet.' : "You haven't posted yet."}
  />
</div>
    </div>
  </>)
}
