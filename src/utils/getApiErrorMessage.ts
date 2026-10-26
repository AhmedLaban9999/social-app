import { isAxiosError } from '../api/client'

// Returns the API's error message (err.response.data.message) or the fallback.
export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const message = err.response?.data?.message
    if (typeof message === 'string' && message) return message
  }
  return fallback
}
