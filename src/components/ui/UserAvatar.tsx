import { Avatar } from 'flowbite-react'
import defaultProfile from '../../assets/default-profile.png'

export interface UserAvatarProps {
  src?: string | null
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  alt?: string
  className?: string
}

export default function UserAvatar({ src, size, alt, className }: UserAvatarProps) {
  const imgSrc = src && src.trim() !== '' ? src : defaultProfile
  return <Avatar img={imgSrc} rounded size={size} alt={alt} className={className} />
}
