import { useContext, type ReactNode } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../../context/AuthContext'

export interface UserLinkProps {
  userId?: string
  to?: string
  className?: string
  children: ReactNode
}

export default function UserLink({ userId, to, className = '', children }: UserLinkProps) {
  const { userData } = useContext(AuthContext)
  const target =
    to ?? (userId ? (userData?._id && userId === userData._id ? '/Profile' : `/user/${userId}`) : undefined)

  if (!target) {
    return <>{children}</>
  }

  return (
    <Link to={target} className={`cursor-pointer hover:underline ${className}`.trim()}>
      {children}
    </Link>
  )
}
