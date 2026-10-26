import { api } from './client'

export function getPostComments(postId: string) {
  return api.get(`/posts/${postId}/comments?page=1&limit=10`)
}

export function createComment(postId: string, formData: FormData) {
  return api.post(`/posts/${postId}/comments`, formData)
}

export function updateComment(postId: string, commentId: string, formData: FormData) {
  return api.put(`/posts/${postId}/comments/${commentId}`, formData)
}

export function deleteComment(postId: string, commentId: string) {
  return api.delete(`/posts/${postId}/comments/${commentId}`)
}

export function likeComment(postId: string, commentId: string) {
  return api.put(`/posts/${postId}/comments/${commentId}/like`, {})
}

export function getReplies(postId: string, commentId: string) {
  return api.get(`/posts/${postId}/comments/${commentId}/replies`)
}

export function createReply(postId: string, commentId: string, formData: FormData) {
  return api.post(`/posts/${postId}/comments/${commentId}/replies`, formData)
}
