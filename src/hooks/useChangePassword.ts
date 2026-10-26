import { useMutation } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { isAxiosError } from '../api/client'
import { changePassword, type ChangePasswordBody } from '../api/auth.api'

export function useChangePassword(options?: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (values: ChangePasswordBody) =>
      changePassword({ password: values.password, newPassword: values.newPassword }),
    onSuccess: (res) => {
      localStorage.setItem('usertoken', res.data.data.token)
      options?.onSuccess?.()
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        Swal.fire({ icon: 'error', title: 'Error!', text: err.response?.data.message })
      }
    },
  })
}
