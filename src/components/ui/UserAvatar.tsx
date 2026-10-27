import { Avatar } from 'flowbite-react'
import defaultProfile from '../../assets/default-profile.png'
import UserLink from './UserLink'

export interface UserAvatarProps {
  src?: string | null
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  alt?: string
  className?: string
  userId?: string
  to?: string
}

export default function UserAvatar({ src, size, alt, className, userId, to }: UserAvatarProps) {
  const imgSrc = src && src.trim() !== '' ? src : defaultProfile
  const avatar = <Avatar img={imgSrc} rounded size={size} alt={alt} className={className} />

  if (userId || to) {
    return (
      <UserLink userId={userId} to={to} className="shrink-0">
        {avatar}
      </UserLink>
    )
  }

  return avatar
}
