import { api } from './client'

export function getPosts() {
  return api.get('/posts')
}

export function getPost(postId: string | undefined) {
  return api.get(`/posts/${postId}`)
}

export function createPost(formData: FormData) {
  return api.post('/posts', formData)
}

export function updatePost(postId: string, formData: FormData) {
  return api.put(`/posts/${postId}`, formData)
}

export function deletePost(postId: string) {
  return api.delete(`/posts/${postId}`)
}

export function toggleBookmark(postId: string) {
  return api.put(`/posts/${postId}/bookmark`, '')
}

export function toggleLike(postId: string) {
  return api.put(`/posts/${postId}/like`, '')
}

export function sharePost(postId: string, body: string) {
  return api.post(`/posts/${postId}/share`, { body })
}
