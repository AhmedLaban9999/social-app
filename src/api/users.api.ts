import { api } from './client'

export function getUserProfile(userId: string | undefined) {
  return api.get(`/users/${userId}/profile`)
}

export function getUserPosts(userId: string | undefined) {
  return api.get(`/users/${userId}/posts`)
}

export function getBookmarks() {
  return api.get('/users/bookmarks')
}

// URL is built exactly as before (search is not URL-encoded) to keep behavior identical.
export function getSuggestions(search: string, limit: number, page?: number) {
  const pageParam = page !== undefined ? `&page=${page}` : ''
  return api.get(`/users/suggestions?limit=${limit}&q=${search}${pageParam}`)
}

export function followUser(userId: string | undefined) {
  return api.put(`/users/${userId}/follow`, {})
}

export function uploadPhoto(formData: FormData) {
  return api.put('/users/upload-photo', formData)
}

export function uploadCover(formData: FormData) {
  return api.put('/users/upload-cover', formData)
}
