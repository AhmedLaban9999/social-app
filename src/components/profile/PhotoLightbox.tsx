interface PhotoLightboxProps {
  src: string
  alt?: string
  open: boolean
  onClose: () => void
}

export default function PhotoLightbox({ src, alt = '', open, onClose }: PhotoLightboxProps) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  )
}
