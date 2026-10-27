import { useEffect, useRef, useState } from 'react'

interface MediaUploadInputProps {
  value: File | null
  onChange: (file: File | null) => void
  accept?: string
  variant?: 'post' | 'comment'
  mode?: 'trigger' | 'preview' | 'both'
}

export default function MediaUploadInput({
  value,
  onChange,
  accept = 'image/*',
  variant = 'post',
  mode = 'both',
}: MediaUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      return
    }

    const url = URL.createObjectURL(value)
    setPreviewUrl(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [value])

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    onChange(null)
  }

  const previewElement =
    value && previewUrl ? (
      variant === 'comment' ? (
        <div className="relative mt-2 w-32">
          <img src={previewUrl} alt="preview" className="h-24 w-32 rounded-lg object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-gray-900/60 text-xs text-white"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ) : (
        <div className="relative">
          <img src={previewUrl} alt="preview" className="max-h-72 w-full rounded-xl object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-900/60 text-white"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )
    ) : null

  const triggerElement =
    variant === 'comment' ? (
      <label className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200">
        <i className="fa-regular fa-image text-lg"></i>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    ) : (
      <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100">
        <i className="fa-regular fa-image text-lg text-green-600"></i>
        <span className="hidden md:inline">Photo/video</span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    )

  if (mode === 'preview') return previewElement
  if (mode === 'trigger') return triggerElement

  return (
    <>
      {previewElement}
      {triggerElement}
    </>
  )
}
