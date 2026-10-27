import Modal from '../ui/Modal'

interface PhotoLightboxProps {
  src: string
  alt?: string
  open: boolean
  onClose: () => void
}

export default function PhotoLightbox({ src, alt = '', open, onClose }: PhotoLightboxProps) {
  return (
    <Modal open={open} onClose={onClose} bare>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo preview"
        className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
      >
        <i aria-hidden="true" className="fa-solid fa-xmark"></i>
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full object-contain"
      />
    </Modal>
  )
}
