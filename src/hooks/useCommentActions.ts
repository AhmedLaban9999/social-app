import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
  likeComment as likeCommentApi,
} from '../api/comments.api'
import { queryKeys } from '../api/queryKeys'

// Comment mutations for one post. Refreshing the visible comment list is still
// done by the caller through the `refetch` prop (removed in Phase 6).
export function useCommentActions(postId: string) {
  const queryClient = useQueryClient()

  const createComment = useMutation({
    mutationFn: (formData: FormData) => createCommentApi(postId, formData),
  })

  const editComment = useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) => {
      const formdata = new FormData()
      formdata.append('content', content)
      return updateCommentApi(postId, commentId, formdata)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts })
    },
  })

  const deleteComment = useMutation({
    mutationFn: (commentId: string) => deleteCommentApi(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts })
      queryClient.invalidateQueries({ queryKey: queryKeys.postDetailsAll })
      queryClient.invalidateQueries({ queryKey: queryKeys.userPostsAll })
    },
  })

  const likeComment = useMutation({
    mutationFn: (commentId: string) => likeCommentApi(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts })
    },
  })

  return { createComment, editComment, deleteComment, likeComment }
}
