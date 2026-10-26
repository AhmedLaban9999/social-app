
import { Navigate } from 'react-router'
import type { ReactNode } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ThreeDots } from 'react-loader-spinner'

interface Props {
  children: ReactNode
}

// Fix #3: Wait for auth state to hydrate before deciding to redirect.
// Without this check there is a flash-to-login on every hard refresh.
export default function ProtectedRoute({ children }: Props) {
  const { isLoading, userData } = useContext(AuthContext)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ThreeDots height="60" width="60" color="#2563eb" ariaLabel="loading" visible />
      </div>
    )
  }

  const token = localStorage.getItem('usertoken')
  if (!token || !userData) {
    return <Navigate to="/Login" replace />
  }

  return <>{children}</>
}
