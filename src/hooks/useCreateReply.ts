import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReply } from '../api/comments.api'
import { queryKeys } from '../api/queryKeys'

export function useCreateReply(postId: string, commentId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (text: string) => {
      const formdata = new FormData()
      formdata.append('content', text)
      return createReply(postId, commentId, formdata)
    },
    onSuccess: () => {
      // Fix #1: refresh() was called here but was never defined — runtime crash.
      // Invalidate the replies query instead to re-fetch from the server.
      queryClient.invalidateQueries({ queryKey: queryKeys.replies(commentId) })
    },
  })
}
