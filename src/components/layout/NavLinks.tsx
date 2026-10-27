import { NavLink } from 'react-router'
import NotificationBadge from './NotificationBadge'

export default function NavLinks() {
  return (
    <div>
      <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-[#F8FAFC] p-1 dark:border-gray-700 dark:bg-gray-800">
        <NavLink
          to="/Feed"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-2xl px-4 py-2 font-bold ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
                : 'text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-700'
            }`
          }
        >
          <i className="fa-regular fa-house"></i>
          <span className="hidden md:inline">Feed</span>
        </NavLink>
        <NavLink
          to="/Profile"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-2xl px-4 py-2 font-bold ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
                : 'text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-700'
            }`
          }
        >
          <i className="fa-regular fa-user"></i> <span className="hidden md:inline">Profile</span>
        </NavLink>
        <NavLink
          to="/Notifications"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-2xl px-4 py-2 font-bold ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
                : 'text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-700'
            }`
          }
        >
          <NotificationBadge /> <span className="hidden md:inline">Notifications</span>
        </NavLink>
      </div>
    </div>
  )
}
