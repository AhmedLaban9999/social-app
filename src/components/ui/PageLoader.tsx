import { Bars, ThreeDots } from 'react-loader-spinner'

export interface PageLoaderProps {
  variant?: 'dots' | 'bars'
  size?: number | string
  fullScreen?: boolean
}

export default function PageLoader({
  variant = 'dots',
  size = 80,
  fullScreen = false,
}: PageLoaderProps) {
  const dim = String(size)
  const loader =
    variant === 'bars' ? (
      <Bars
        height={dim}
        width={dim}
        color="#2563eb"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    ) : (
      <ThreeDots
        height={dim}
        width={dim}
        color="#2563eb"
        ariaLabel={fullScreen ? 'loading' : 'three-dots-loading'}
        visible={true}
      />
    )

  if (fullScreen) {
    return <div className="flex min-h-screen items-center justify-center">{loader}</div>
  }

  return loader
}
