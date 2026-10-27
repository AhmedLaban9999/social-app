import { useState } from 'react'
import Modal from '../ui/Modal'

export interface ShareModalProps {
  open: boolean
  onClose: () => void
  onShare: (text: string) => void
  isPending: boolean
}

export default function ShareModal({ open, onClose, onShare, isPending }: ShareModalProps) {
  const [shareText, setShareText] = useState('')

  const handleSubmit = () => {
    onShare(shareText)
    setShareText('')
  }

  return (
    <Modal open={open} onClose={onClose} title="Share post">
      <textarea
        value={shareText}
        onChange={(e) => setShareText(e.target.value)}
        rows={3}
        placeholder="Say something about this..."
        className="w-full resize-none rounded-2xl border border-gray-200 bg-slate-50 p-4 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-xl px-5 py-2.5 font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
        >
          <i className="fa-solid fa-share-nodes"></i> Share now
        </button>
      </div>
    </Modal>
  )
}
