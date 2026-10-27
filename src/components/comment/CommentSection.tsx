import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useComments } from '../../hooks/useComments'
import CommentCard from './CommentCard'
import CommentCreator from './CommentCreator'

export interface CommentSectionProps {
  postId: string
  enabled: boolean
  onOpen: () => void
}

export default function CommentSection({ postId, enabled, onOpen }: CommentSectionProps) {
  const { userData } = useContext(AuthContext)
  const { comments, refetch } = useComments(postId, { enabled })

  const handleRefresh = () => {
    if (!enabled) {
      onOpen()
    } else {
      refetch()
    }
  }

  return (
    <>
      <div className="mx-2 sm:mx-4 mb-4 rounded-2xl bg-slate-50 p-3 dark:bg-gray-900">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-3 sm:px-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            Comments
            <span className="rounded-full bg-blue-50 px-2 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              {comments?.length ?? 0}
            </span>
          </h3>
          <select className="rounded-xl border border-gray-200 bg-slate-50 py-1.5 ps-2 pe-7 text-xs font-semibold text-gray-700 focus:border-blue-500 focus:ring-blue-500 sm:py-2 sm:ps-3 sm:pe-8 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
            <option>Most relevant</option>
            <option>Newest</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {comments?.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              postId={postId}
              refetch={handleRefresh}
            />
          ))}
        </div>
      </div>

      {userData && (
        <CommentCreator
          name={userData.name}
          photo={userData.photo}
          postId={postId}
          refetch={handleRefresh}
        />
      )}
    </>
  )
}
