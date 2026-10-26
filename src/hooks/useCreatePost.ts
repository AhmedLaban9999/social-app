import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from '../api/client'
import { createPost } from '../api/posts.api'
import { queryKeys } from '../api/queryKeys'

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => createPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts })
    },
    onError: (err) => {
      if (isAxiosError(err)) console.error(err.response?.data)
    },
  })
}
