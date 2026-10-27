import { Dropdown, DropdownItem } from 'flowbite-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import UserAvatar from '../ui/UserAvatar'
import UserLink from '../ui/UserLink'

dayjs.extend(relativeTime)

export interface PostHeaderProps {
  userId: string
  name: string
  photo: string
  createdAt: Date | string
  bookmarked: boolean
  isOwner: boolean
  onToggleBookmark: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function PostHeader({
  userId,
  name,
  photo,
  createdAt,
  bookmarked,
  isOwner,
  onToggleBookmark,
  onEdit,
  onDelete,
}: PostHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-3">
      <div className="flex items-center gap-3">
        <UserAvatar src={photo} size="md" userId={userId} />
        <div>
          <p className="text-sm text-gray-500">
            <UserLink userId={userId} className="font-bold text-gray-900 dark:text-white">
              {name}
            </UserLink>
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{dayjs(createdAt).fromNow()}</span>
            <span>·</span>
            <i className="fa-solid fa-earth-americas"></i>
            <span>Public</span>
          </div>
        </div>
      </div>

      <Dropdown
        inline
        arrowIcon={false}
        label={<i className="fa-solid fa-ellipsis text-gray-500 text-lg"></i>}
      >
        <DropdownItem onClick={onToggleBookmark}>
          <i className={`${bookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark me-3 w-4`}></i>
          {bookmarked ? 'Unsave post' : 'Save post'}
        </DropdownItem>
        {isOwner && (
          <>
            <DropdownItem onClick={onEdit}>Edit</DropdownItem>
            <DropdownItem onClick={onDelete}>Delete</DropdownItem>
          </>
        )}
      </Dropdown>
    </div>
  )
}
