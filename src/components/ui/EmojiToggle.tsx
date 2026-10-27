import { useState } from 'react'
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'

interface EmojiToggleProps {
  onEmojiSelect: (emojiData: EmojiClickData) => void
  open?: boolean
  onToggle?: () => void
  variant?: 'post' | 'comment'
  mode?: 'button' | 'picker' | 'both'
}

export default function EmojiToggle({
  onEmojiSelect,
  open,
  onToggle,
  variant = 'post',
  mode = 'both',
}: EmojiToggleProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = open !== undefined ? open : internalOpen
  const handleToggle = onToggle ?? (() => setInternalOpen((prev) => !prev))

  const buttonElement =
    variant === 'comment' ? (
      <button
        type="button"
        onClick={handleToggle}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-200"
      >
        <i className="fa-regular fa-face-smile text-lg"></i>
      </button>
    ) : (
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
      >
        <i className="fa-regular fa-face-smile text-lg text-orange-500"></i>
        <span className="hidden md:inline">Feeling/activity</span>
      </button>
    )

  const pickerElement = isOpen ? (
    variant === 'comment' ? (
      <div className="mt-2 ms-12">
        <EmojiPicker onEmojiClick={onEmojiSelect} width="100%" height={320} />
      </div>
    ) : (
      <EmojiPicker onEmojiClick={onEmojiSelect} width="100%" height={350} />
    )
  ) : null

  if (mode === 'button') return buttonElement
  if (mode === 'picker') return pickerElement

  return (
    <>
      {buttonElement}
      {pickerElement}
    </>
  )
}
