import type { Post } from '../../types/posts'
import PostCard from './PostCard'

export interface PostListProps {
  posts?: Post[]
  emptyMessage?: string
}

export default function PostList({ posts, emptyMessage }: PostListProps) {
  if (!posts || posts.length === 0) {
    return emptyMessage ? (
      <p className="py-10 text-center text-gray-500 dark:text-gray-400">{emptyMessage}</p>
    ) : null
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} element={post} />
      ))}
    </>
  )
}
