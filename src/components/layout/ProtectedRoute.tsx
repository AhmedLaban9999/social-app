
import { Navigate } from 'react-router'
import type { ReactNode } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import PageLoader from '../ui/PageLoader'

interface Props {
  children: ReactNode
}

// Fix #3: Wait for auth state to hydrate before deciding to redirect.
// Without this check there is a flash-to-login on every hard refresh.
export default function ProtectedRoute({ children }: Props) {
  const { isLoading, userData } = useContext(AuthContext)

  if (isLoading) {
    return <PageLoader variant="dots" size={60} fullScreen />
  }

  const token = localStorage.getItem('usertoken')
  if (!token || !userData) {
    return <Navigate to="/Login" replace />
  }

  return <>{children}</>
}
