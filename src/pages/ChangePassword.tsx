import * as zod from 'zod'
import {useState} from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useChangePassword } from '../hooks/useChangePassword';
import FormField from '../components/ui/FormField';

export default function ChangePassword() {
    const [successMsg, setSuccessMsg] = useState('')
const validschema=zod.object({
    password:zod.string().min(1, 'Current password is required'),
     newPassword :zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        , 'Password must contain uppercase, lowercase, number and special character, min 8 chars'),
         rePassword: zod.string(),
}).refine((data)=> data.newPassword === data.rePassword,{
message:'passwords do not match',
path:['rePassword']
})
type passwordForm =zod.infer<typeof validschema>
const  { handleSubmit, register,reset ,formState: { errors } } = useForm<passwordForm>({
     defaultValues: {
    password: '',
    newPassword: '',
    rePassword: '',
  },
  resolver:zodResolver(validschema)
})
const { mutate, isPending } = useChangePassword({
  onSuccess: () => {
    reset()
    setSuccessMsg('Password changed successfully.')
  },
})
function handleApi(values: passwordForm) {
  mutate(values)
}

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <title>Change Password</title>

      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
    
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-600">
            <i className="fa-solid fa-key"></i>
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Change Password</h1>
            <p className="text-gray-500">Keep your account secure by using a strong password.</p>
          </div>
        </div>

        
        <form  onSubmit={handleSubmit(handleApi)} className="flex flex-col gap-5">
          <FormField
            {...register('password')}
            variant="native"
            label="Current password"
            type="password"
            placeholder="Enter current password"
            error={errors.password?.message}
          />

          <FormField
            {...register('newPassword')}
            variant="native"
            label="New password"
            type="password"
            placeholder="Enter new password"
            error={errors.newPassword?.message}
            helperText="At least 8 characters with uppercase, lowercase, number, and special character."
          />

          <FormField
            {...register('rePassword')}
            variant="native"
            label="Confirm new password"
            type="password"
            placeholder="Re-enter new password"
            error={errors.rePassword?.message}
          />
{successMsg && (
  <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
    {successMsg}
  </div>
)}
          <button
          disabled={isPending}
            type="submit"
            className="w-full rounded-2xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
          {isPending ?'updating': 'update password'}
          </button>
        </form>
      </div>
    </div>
  )
}