import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react'
import { NavLink } from 'react-router'
import UserAvatar from '../ui/UserAvatar'

export interface UserMenuProps {
  name?: string
  photo?: string
  onLogout: () => void
}

export default function UserMenu({ name, photo, onLogout }: UserMenuProps) {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-[#F8FAFC] p-1 dark:border-gray-700 dark:bg-gray-800">
          <UserAvatar alt="User settings" src={photo} />
          <span className="hidden md:inline dark:text-white">{name}</span>{' '}
          <i className="fa-solid fa-bars text-gray-500 dark:text-gray-300"></i>
        </div>
      }
    >
      <DropdownItem as={NavLink} to="/Profile" className="gap-3">
        <i className="fa-regular fa-user w-4"></i> Profile
      </DropdownItem>
      <DropdownItem as={NavLink} to="/ChangePassword" className="gap-3">
        <i className="fa-solid fa-gear w-4"></i> Settings
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem
        onClick={onLogout}
        className="gap-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
      >
        Logout
      </DropdownItem>
    </Dropdown>
  )
}
