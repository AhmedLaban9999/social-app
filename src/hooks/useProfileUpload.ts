import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadPhoto as uploadPhotoApi, uploadCover as uploadCoverApi } from '../api/users.api'
import { queryKeys } from '../api/queryKeys'
import type { User1 } from '../types/posts'

export function useProfileUpload(options?: {
  onPhotoSuccess?: (photoUrl: User1['photo']) => void
  onCoverSuccess?: (coverUrl: User1['cover']) => void
}) {
  const queryClient = useQueryClient()

  const uploadPhoto = useMutation({
    mutationFn: (photo: File) => {
      const formdata = new FormData()
      formdata.append('photo', photo)
      return uploadPhotoApi(formdata)
    },
    onSuccess: (res) => {
      options?.onPhotoSuccess?.(res.data.data.photo)
      queryClient.invalidateQueries({ queryKey: queryKeys.userPostsAll })
    },
  })

  const uploadCover = useMutation({
    mutationFn: (cover: File) => {
      const formdata = new FormData()
      formdata.append('cover', cover)
      return uploadCoverApi(formdata)
    },
    onSuccess: (res) => {
      options?.onCoverSuccess?.(res.data.data.cover)
      queryClient.invalidateQueries({ queryKey: queryKeys.userPostsAll })
    },
  })

  return { uploadPhoto, uploadCover }
}
