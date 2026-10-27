import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useCreateReply } from '../../hooks/useCreateReply'
import UserAvatar from '../ui/UserAvatar'

export interface ReplyCreatorProps {
  postId: string
  commentId: string
  replyToName: string
  autoFocus?: boolean
}

export default function ReplyCreator({
  postId,
  commentId,
  replyToName,
  autoFocus = false,
}: ReplyCreatorProps) {
  const { userData } = useContext(AuthContext)
  const [replyText, setReplyText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const createReplyMutation = useCreateReply(postId, commentId)

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])

  const handleCreateReply = () => {
    createReplyMutation.mutate(replyText, {
      onSuccess: () => {
        setReplyText('')
      },
    })
  }

  return (
    <div className="flex items-start gap-2">
      <UserAvatar src={userData?.photo} size="xs" />
      <div className="flex flex-1 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-1.5">
        <input
          onChange={(e) => setReplyText(e.target.value)}
          value={replyText}
          ref={inputRef}
          type="text"
          placeholder={`Reply to ${replyToName}...`}
          className="flex-1 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:outline-none"
        />
        <button
          onClick={handleCreateReply}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs text-white hover:bg-blue-700"
        >
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </div>
  )
}
