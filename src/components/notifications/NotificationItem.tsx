import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Notification } from '../../types/Notifications'
import UserAvatar from '../ui/UserAvatar'
import UserLink from '../ui/UserLink'

dayjs.extend(relativeTime)

const typeInfo: Record<string, { text: string; icon: string; color: string }> = {
  follow_user: { text: 'followed you', icon: 'fa-solid fa-user-plus', color: 'text-purple-600' },
  comment_post: { text: 'commented on your post', icon: 'fa-regular fa-comment', color: 'text-blue-600' },
  like_post: { text: 'liked your post', icon: 'fa-regular fa-heart', color: 'text-rose-500' },
  share_post: { text: 'shared your post', icon: 'fa-solid fa-retweet', color: 'text-green-600' },
}

export interface NotificationItemProps {
  notification: Notification
  onMarkRead: (id: string) => void
}

export default function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const info = typeInfo[notification.type]

  return (
    <div
      className={`flex gap-4 rounded-2xl border p-4 sm:p-5 ${
        notification.isRead
          ? 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
          : 'border-blue-100 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20'
      }`}
    >
      <div className="relative h-fit shrink-0">
        <UserAvatar src={notification.actor.photo} size="md" userId={notification.actor._id} />
        <span
          className={`absolute -right-1 -bottom-6 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs shadow-sm dark:bg-gray-700 ${info?.color}`}
        >
          <i className={info?.icon}></i>
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-gray-700 dark:text-gray-300">
            <UserLink
              userId={notification.actor._id}
              className="font-bold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
            >
              {notification.actor.name}
            </UserLink>{' '}
            {info?.text}
          </p>
          <div className="flex shrink-0 items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            {dayjs(notification.createdAt).fromNow()}
            {!notification.isRead && <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>}
          </div>
        </div>

        <p className="mt-1 truncate text-gray-600 dark:text-gray-400">
          {notification.entity.name ?? notification.entity.body}
        </p>

        {notification.isRead ? (
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
            <i className="fa-solid fa-check"></i> Read
          </p>
        ) : (
          <button
            onClick={() => onMarkRead(notification._id)}
            className="mt-3 flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
          >
            <i className="fa-solid fa-check"></i> Mark as read
          </button>
        )}
      </div>
    </div>
  )
}
