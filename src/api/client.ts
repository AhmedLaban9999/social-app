import axios, { isAxiosError } from 'axios'

// Re-exported so components can narrow errors without importing axios directly.
export { isAxiosError }

// Auth requests: no token attached, and a 401 here (e.g. wrong password)
// must reach the caller's own error handling instead of redirecting.
const PUBLIC_PATHS = ['/users/signin', '/users/signup']

function isPublicRequest(url?: string): boolean {
  return !!url && PUBLIC_PATHS.some((path) => url.startsWith(path))
}

// Login (#/Login) and Register (#/ or empty hash). Router paths are case-insensitive.
function isOnAuthPage(): boolean {
  const path = window.location.hash.replace(/^#/, '').split('?')[0].toLowerCase()
  return path === '' || path === '/' || path === '/login'
}

// No default Content-Type: axios picks JSON or multipart (with boundary) per request.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Read the token on every request so login/logout take effect immediately.
api.interceptors.request.use((config) => {
  if (isPublicRequest(config.url)) return config
  const token = localStorage.getItem('usertoken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      !isPublicRequest(error.config?.url) &&
      !isOnAuthPage()
    ) {
      localStorage.removeItem('usertoken')
      // The app uses createHashRouter, so redirect via the hash.
      window.location.hash = '#/Login'
    }
    // Always re-throw so callers keep their own error handling.
    return Promise.reject(error)
  },
)
