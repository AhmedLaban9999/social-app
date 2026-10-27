import { Link, useParams } from 'react-router'
import PostCard from '../components/post/PostCard'
import type { Post } from '../types/posts'
import { usePostDetails } from '../hooks/usePostDetails'
import PageLoader from '../components/ui/PageLoader'
import ErrorState from '../components/ui/ErrorState'

export default function PostsDetails() {
  const { id } = useParams()
  const { isError, isLoading, error, data, refetch } = usePostDetails(id)

  if (isLoading) {
    return <PageLoader variant="bars" size={80} fullScreen />
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || 'Failed to load post'}
        onRetry={() => refetch()}
      />
    )
  }

  const post: Post = data?.data.data.post

  return (
    <>
      {post && <title>{`Post | ${post.user.name}`}</title>}
      <Link
        to="/feed"
        className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <i aria-hidden="true" className="fa-solid fa-arrow-left"></i> Back to feed
      </Link>
      <div className="flex w-full justify-center py-8">
        {post && <PostCard element={post} />}
      </div>
    </>
  )
}
