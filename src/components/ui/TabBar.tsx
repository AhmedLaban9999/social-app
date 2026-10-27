import type { ReactNode } from 'react'

export interface TabItem {
  key: string
  label: string
  icon?: string
}

export interface TabBarProps {
  tabs: TabItem[]
  active: string
  onChange: (key: string) => void
  variant?: 'pills' | 'sidebar'
  badge?: ReactNode
}

export default function TabBar({
  tabs,
  active,
  onChange,
  variant = 'pills',
  badge,
}: TabBarProps) {
  if (variant === 'sidebar') {
    return (
      <nav className="hidden lg:block self-start sticky top-24 rounded-3xl bg-white p-3 shadow-sm dark:bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-semibold ${
              active === tab.key
                ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {tab.icon && <i className={tab.icon}></i>}
            {tab.label}
          </button>
        ))}
      </nav>
    )
  }

  return (
    <div className="mt-6 flex items-center justify-between rounded-3xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-gray-900">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold ${
              active === tab.key
                ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            }`}
          >
            {tab.icon && <i className={tab.icon}></i>} {tab.label}
          </button>
        ))}
      </div>

      {badge !== undefined && (
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          {badge}
        </span>
      )}
    </div>
  )
}
