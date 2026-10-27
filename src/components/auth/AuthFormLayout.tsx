import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface AuthFormLayoutProps {
  activeTab: 'login' | 'register'
  children: ReactNode
}

export default function AuthFormLayout({ activeTab, children }: AuthFormLayoutProps) {
  return (
    <div className="flex min-h-screen items-center px-4 py-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="hidden lg:block">
          <h1 className="text-6xl font-extrabold tracking-tight text-blue-900 dark:text-blue-400">Route Posts</h1>
          {activeTab === 'login' ? (
            <>
              <p className="mt-4 max-w-xl text-2xl text-gray-700 dark:text-gray-300">
                Connect with friends and the world around you on Route Posts.
              </p>

              <div className="mt-8 rounded-3xl border border-blue-100 bg-white/70 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <p className="text-sm font-bold tracking-widest text-blue-900 uppercase dark:text-blue-400">About Route Academy</p>
                <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">Egypt's Leading IT Training Center Since 2012</h2>
                <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
                  Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in
                  delivering high-quality training courses in programming, web development, and application development.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    ['2012', 'Founded'],
                    ['40K+', 'Graduates'],
                    ['50+', 'Partner companies'],
                    ['5', 'Branches'],
                    ['20', 'Diplomas available'],
                  ].map(([num, label]) => (
                    <div key={label} className="rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
                      <p className="text-lg font-bold text-blue-900 dark:text-blue-400">{num}</p>
                      <p className="text-xs font-semibold text-gray-600 uppercase dark:text-gray-400">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="mt-4 max-w-xl text-2xl text-gray-700 dark:text-gray-300">
                Join the community and start sharing your moments with friends.
              </p>
              <ul className="mt-8 flex flex-col gap-4 text-lg text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-pen-to-square w-6 text-blue-600 dark:text-blue-400"></i> Share posts and photos
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-comments w-6 text-blue-600 dark:text-blue-400"></i> Comment and reply in real time
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-user-group w-6 text-blue-600 dark:text-blue-400"></i> Follow friends and discover new people
                </li>
              </ul>
            </>
          )}
        </div>

        <div className="w-full max-w-md justify-self-center rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:justify-self-end dark:bg-gray-800">
          <div className="mb-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1 dark:bg-gray-900">
            {activeTab === 'login' ? (
              <>
                <span className="rounded-xl bg-white py-2.5 text-center font-bold text-blue-900 shadow-sm dark:bg-gray-700 dark:text-blue-400">Login</span>
                <Link to="/" className="rounded-xl py-2.5 text-center font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/Login" className="rounded-xl py-2.5 text-center font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Login
                </Link>
                <span className="rounded-xl bg-white py-2.5 text-center font-bold text-blue-900 shadow-sm dark:bg-gray-700 dark:text-blue-400">
                  Register
                </span>
              </>
            )}
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {activeTab === 'login' ? 'Log in to Route Posts' : 'Create your account'}
          </h2>
          <p className="mt-1 mb-6 text-gray-500 dark:text-gray-400">
            {activeTab === 'login' ? 'Log in and continue your social journey.' : "It's quick and easy."}
          </p>

          {children}
        </div>
      </div>
    </div>
  )
}
