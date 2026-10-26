import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  deletePost as deletePostApi,
  updatePost as updatePostApi,
  toggleBookmark as toggleBookmarkApi,
  toggleLike as toggleLikeApi,
  sharePost as sharePostApi,
} from '../api/posts.api'
import { queryKeys } from '../api/queryKeys'

// Mutations for a single post (PostCard + PostFooter).
// Component-specific side effects (closing the editor, resetting the share box)
// are passed as per-call callbacks: mutation.mutate(vars, { onSuccess }).
export function usePostActions(postId: string) {
  const queryClient = useQueryClient()

  const deletePost = useMutation({
    mutationFn: () => deletePostApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts })
    },
  })

  const editPost = useMutation({
    mutationFn: (body: string) => {
      const formdata = new FormData()
      formdata.append('body', body)
      return updatePostApi(postId, formdata)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts })
      queryClient.invalidateQueries({ queryKey: queryKeys.postDetailsAll })
    },
  })

  const toggleBookmark = useMutation({
    mutationFn: () => toggleBookmarkApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts })
      queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks })
    },
  })

  const toggleLike = useMutation({
    mutationFn: () => toggleLikeApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts })
    },
  })

  const sharePost = useMutation({
    mutationFn: (body: string) => sharePostApi(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts })
    },
  })

  return { deletePost, editPost, toggleBookmark, toggleLike, sharePost }
}
