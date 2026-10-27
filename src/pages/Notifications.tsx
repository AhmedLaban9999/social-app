import { useState } from 'react'
import { useNotifications } from '../hooks/useNotifications'
import { useUnreadCount } from '../hooks/useUnreadCount'
import PageLoader from '../components/ui/PageLoader'
import NotificationItem from '../components/notifications/NotificationItem'

export default function Notifications() {
  const [fillter, setfillter] = useState('all')

  const { notifications, isLoading, isError, refetch, markRead, markAllRead } = useNotifications()
  const { unreadCount: unreadcount } = useUnreadCount()

  const shownNotifications =
    fillter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications

  const handleisread = (id: string) => markRead.mutate(id)
  const handleReadAll = () => markAllRead.mutate()

  if (isLoading) {
    return <PageLoader fullScreen />
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-2 py-6 sm:px-4">
      <title>Notifications</title>
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 p-4 sm:p-6 dark:border-gray-700">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                Notifications
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Realtime updates for likes, comments, shares, and follows.
              </p>
            </div>
            <button
              onClick={() => handleReadAll()}
              disabled={unreadcount === 0}
              className="flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <i className="fa-solid fa-check-double"></i> Mark all as read
            </button>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setfillter('all')}
              className={`rounded-full px-5 py-2 font-semibold ${
                fillter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-gray-700 hover:bg-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setfillter('unread')}
              className={`flex items-center gap-2 rounded-full px-5 py-2 font-semibold ${
                fillter === 'unread'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-gray-700 hover:bg-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Unread
              {unreadcount > 0 && (
                <span className="rounded-full bg-white px-2 text-sm text-blue-600">{unreadcount}</span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-3 sm:p-5">
          {isError ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <p className="text-red-600 dark:text-red-400">Failed to load notifications</p>
              <button
                onClick={() => refetch()}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : shownNotifications.length === 0 ? (
            <p className="py-10 text-center text-gray-500 dark:text-gray-400">No notifications here.</p>
          ) : (
            shownNotifications.map((element) => (
              <NotificationItem
                key={element._id}
                notification={element}
                onMarkRead={handleisread}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
