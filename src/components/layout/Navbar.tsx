import { Navbar as FlowNavbar } from 'flowbite-react'
import { useContext } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import imglogo from '../../assets/route.png'
import { useDarkMode } from '../../hooks/useDarkMode'
import NavLinks from './NavLinks'
import UserMenu from './UserMenu'

export default function Navbar() {
  const { userData, setUserData, isLoading } = useContext(AuthContext)
  const location = useLocation()
  const hideNav = ['/Login', '/'].includes(location.pathname)
  const showNav = !hideNav && !!userData
  const { isDark, toggle } = useDarkMode()
  const navg = useNavigate()

  function Logout() {
    localStorage.removeItem('usertoken')
    setUserData(null)
    navg('/Login')
  }

  return (
    <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="w-full px-3 md:px-[5%]">
        <FlowNavbar fluid className="bg-transparent px-0 dark:bg-transparent">
          <div className="flex w-full items-center justify-between gap-4">
            <Link to="/Feed" className="flex items-center">
              <img src={imglogo} className="mr-3 h-6 rounded-2xl sm:h-9" alt="Flowbite React Logo" />
              <span className="hidden self-center text-[20px] leading-tight font-bold lg:inline lg:whitespace-nowrap dark:text-white">
                Route Posts
              </span>
            </Link>

            {showNav && <NavLinks />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-[#F8FAFC] text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700"
              >
                <i aria-hidden="true" className={isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
              </button>

              {showNav ? (
                <UserMenu name={userData?.name} photo={userData?.photo} onLogout={Logout} />
              ) : (
                !isLoading &&
                !hideNav && (
                  <>
                    <NavLink to="/" className="me-2 mt-1 dark:text-gray-200">
                      Register
                    </NavLink>
                    <NavLink to="/Login" className="mt-1 dark:text-gray-200">
                      Login
                    </NavLink>
                  </>
                )
              )}
            </div>
          </div>
        </FlowNavbar>
      </div>
    </div>
  )
}
