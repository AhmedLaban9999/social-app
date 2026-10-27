import { Button, Textarea } from 'flowbite-react'

export interface PostEditFormProps {
  value: string
  onChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
  isPending: boolean
}

export default function PostEditForm({
  value,
  onChange,
  onSave,
  onCancel,
  isPending,
}: PostEditFormProps) {
  return (
    <div className="px-4 pb-3">
      <Textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl"
      />
      <div className="mt-3 flex justify-end gap-2">
        <Button color="light" pill size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button pill size="sm" onClick={onSave} disabled={isPending}>
          Save
        </Button>
      </div>
    </div>
  )
}
