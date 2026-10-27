import type { Friend } from '../../types/Friends'
import UserAvatar from '../ui/UserAvatar'

interface FriendCardProps {
  friend: Friend
  onFollow?: (id: string) => void
  isFollowing?: boolean
  isPending?: boolean
  variant?: 'compact' | 'card'
}

export default function FriendCard({
  friend,
  onFollow,
  isFollowing = false,
  isPending = false,
  variant = 'compact',
}: FriendCardProps) {
  if (variant === 'card') {
    return (
      <div className="rounded-2xl border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <UserAvatar src={friend.photo} size="md" />
            <div className="min-w-0">
              <p className="truncate font-bold text-gray-900">{friend.name}</p>
              <p className="truncate text-sm text-gray-500">{friend.username}</p>
            </div>
          </div>
          <button
            onClick={onFollow ? () => onFollow(friend._id) : undefined}
            disabled={isPending || undefined}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-100"
          >
            <i className={`fa-solid ${isFollowing ? 'fa-user-check' : 'fa-user-plus'} text-xs`}></i> {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600">{friend.followersCount} followers</span>
          {friend.mutualFollowersCount > 0 && (
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-600">{friend.mutualFollowersCount} mutual</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-200 px-3 py-2.5 dark:border-gray-700">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar src={friend.photo} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{friend.name}</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">@{friend.username}</p>
          </div>
        </div>
        <button
          onClick={onFollow ? () => onFollow(friend._id) : undefined}
          disabled={isPending || undefined}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
        >
          <i className={`fa-solid ${isFollowing ? 'fa-user-check' : 'fa-user-plus'} text-sm`}></i> {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>

      <div className="mt-2 flex gap-2 text-xs">
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {friend.followersCount} followers
        </span>
        {friend.mutualFollowersCount > 0 && (
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            {friend.mutualFollowersCount} mutual
          </span>
        )}
      </div>
    </div>
  )
}
