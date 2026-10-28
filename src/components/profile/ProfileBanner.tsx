import type { User1 } from '../../types/posts'
import UserAvatar from '../ui/UserAvatar'

interface ProfileBannerProps {
  user: User1
  editable?: boolean
  onPhotoChange?: (file: File) => void
  onCoverChange?: (file: File) => void
  onPhotoClick?: () => void
  myPostsCount?: number
  bookmarksCount?: number
  isFollowing?: boolean
  isFollowPending?: boolean
  onFollow?: () => void
}

export default function ProfileBanner({
  user,
  editable = false,
  onPhotoChange,
  onCoverChange,
  onPhotoClick,
  myPostsCount = 0,
  bookmarksCount = 0,
  isFollowing = false,
  isFollowPending = false,
  onFollow,
}: ProfileBannerProps) {
  if (!editable) {
    return (
      <div className="w-full overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-800">
        <div
          className="h-56 bg-linear-to-r from-slate-800 via-blue-900 to-sky-500 bg-cover bg-center"
          style={user.cover ? { backgroundImage: `url(${user.cover})` } : undefined}
        ></div>

        <div className="relative mx-4 -mt-20 mb-6 rounded-3xl bg-white/90 p-6 backdrop-blur md:mx-10 dark:bg-gray-800/90">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-start">
              <div className="rounded-full border-4 border-white bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <UserAvatar src={user.photo} size="xl" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{user.name}</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">@{user.username}</p>
              </div>
            </div>

            <button
              onClick={() => onFollow?.()}
              disabled={isFollowPending}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold disabled:opacity-60 ${
                isFollowing
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <i className={`fa-solid ${isFollowing ? 'fa-user-check' : 'fa-user-plus'}`}></i>
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Followers', value: user.followersCount },
    { label: 'Following', value: user.followingCount },
    { label: 'Bookmarks', value: user.bookmarks?.length },
  ]

  return (
    <div className="w-full overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-800">
      <div
        className="relative h-56 bg-linear-to-r from-slate-800 via-blue-900 to-sky-500 bg-cover bg-center"
        style={user.cover ? { backgroundImage: `url(${user.cover})` } : undefined}
      >
        <label
          aria-label="Change cover photo"
          className="absolute top-4 right-4 flex cursor-pointer items-center gap-2 rounded-xl bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-black/60"
        >
          <i aria-hidden="true" className="fa-solid fa-camera"></i>
          <span className="hidden sm:inline">Change cover</span>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              e.target.files?.[0] && onCoverChange?.(e.target.files[0])
            }}
          />
        </label>
      </div>

      <div className="group relative mx-3 -mt-20 mb-6 rounded-3xl bg-white/90 p-4 backdrop-blur sm:p-6 md:mx-10 dark:bg-gray-800/90">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-start">
            <div className="relative">
              <button
                type="button"
                onClick={onPhotoClick}
                aria-label="View profile photo"
                className="cursor-pointer rounded-full border-4 border-blue-100 bg-white p-1 dark:border-gray-700 dark:bg-gray-800"
              >
                <UserAvatar src={user.photo} size="xl" />
              </button>

              <button
                type="button"
                onClick={onPhotoClick}
                aria-label="Expand profile photo"
                className="absolute bottom-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-blue-600 shadow-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
              >
                <i aria-hidden="true" className="fa-solid fa-expand"></i>
              </button>

              <label
                aria-label="Upload profile photo"
                className="absolute right-0 bottom-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 hover:bg-blue-700"
              >
                <i aria-hidden="true" className="fa-solid fa-camera"></i>
                <input
                  onChange={(e) => {
                    e.target.files?.[0] && onPhotoChange?.(e.target.files[0])
                  }}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">{user.name}</h1>
              <p className="text-base text-gray-500 dark:text-gray-400">@{user.username}</p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-400">
                <i className="fa-solid fa-user-group"></i> Route Posts member
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((item) => (
              <div key={item.label} className="min-w-0 rounded-2xl border border-gray-200 bg-white px-1 py-5 text-center sm:px-4 dark:border-gray-700 dark:bg-gray-900">
                <p className="truncate text-[10px] font-semibold tracking-normal text-gray-500 uppercase sm:text-xs sm:tracking-wide dark:text-gray-400">{item.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid items-start gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 lg:col-span-2 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-3 font-bold text-gray-900 dark:text-white">About</h2>
            <p className="flex items-center gap-3 break-all text-gray-600 dark:text-gray-300">
              <i className="fa-regular fa-envelope w-4"></i> {user.email}
            </p>
            <p className="mt-2 flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <i className="fa-solid fa-user-group w-4"></i> Active on Route Posts
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-blue-100 bg-slate-50 p-5 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs font-semibold tracking-wide text-blue-800 uppercase dark:text-blue-400">My posts</p>
              <p className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">{myPostsCount}</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-slate-50 p-5 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs font-semibold tracking-wide text-blue-800 uppercase dark:text-blue-400">Saved posts</p>
              <p className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">{bookmarksCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
