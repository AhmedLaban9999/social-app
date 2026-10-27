import { useUnreadCount } from '../../hooks/useUnreadCount'

export default function NotificationBadge() {
  const { unreadCount } = useUnreadCount()

  return (
    <span className="relative">
      <i className="fa-regular fa-comment"></i>
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
          {unreadCount}
        </span>
      )}
    </span>
  )
}
