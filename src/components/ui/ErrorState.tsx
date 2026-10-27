export interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="mx-auto my-8 flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <p className="font-semibold text-red-600 dark:text-red-400">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Retry
        </button>
      )}
    </div>
  )
}
