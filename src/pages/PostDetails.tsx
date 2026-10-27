import { Link, useParams } from 'react-router'
import PostCard from '../components/post/PostCard'
import type { Post } from '../types/posts'
import { usePostDetails } from '../hooks/usePostDetails'
import PageLoader from '../components/ui/PageLoader'

export default function PostsDetails() {
  const { id } = useParams()
  const { isError, isLoading, error, data } = usePostDetails(id)

  if (isLoading) {
    return <PageLoader variant="bars" size={80} />
  }

  if (isError) {
    return <h2 className="text-red-500">{error?.message}</h2>
  }

  const post: Post = data?.data.data.post

  return (
    <>
      {post && <title>{`Post | ${post.user.name}`}</title>}
      <Link
        to="/feed"
        className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <i className="fa-solid fa-arrow-left"></i>back
      </Link>
      <div className="flex w-full justify-center py-8">
        {post && <PostCard element={post} />}
      </div>
    </>
  )
}
