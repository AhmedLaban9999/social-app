import * as z from 'zod'

export const PASSWORD_RULE_CHECKS = [
  {
    key: 'length',
    label: 'At least 8 characters',
    test: (val: string) => val.length >= 8,
  },
  {
    key: 'lowercase',
    label: 'At least one lowercase letter (a-z)',
    test: (val: string) => /[a-z]/.test(val),
  },
  {
    key: 'uppercase',
    label: 'At least one uppercase letter (A-Z)',
    test: (val: string) => /[A-Z]/.test(val),
  },
  {
    key: 'number',
    label: 'At least one number (0-9)',
    test: (val: string) => /\d/.test(val),
  },
  {
    key: 'special',
    label: 'At least one special character (#?!@$%^&*-)',
    test: (val: string) => /[#?!@$%^&*-]/.test(val),
  },
] as const

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Add at least one lowercase letter')
  .regex(/[A-Z]/, 'Add at least one uppercase letter')
  .regex(/\d/, 'Add at least one number')
  .regex(/[#?!@$%^&*-]/, 'Add at least one special character (#?!@$%^&*-)')

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address',
    ),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Full name is required')
      .min(3, 'Full name must be at least 3 characters')
      .max(20, 'Full name must be at most 20 characters'),
    username: z
      .string()
      .trim()
      .min(1, 'Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters')
      .regex(
        /^[a-zA-Z0-9_.]+$/,
        'Username can only contain letters, numbers, underscores, and dots',
      ),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address',
      ),
    dateOfBirth: z
      .date({ error: 'Date of birth is required' })
      .refine((date) => date <= new Date(), {
        message: 'Date of birth cannot be in the future',
      })
      .refine(
        (date) => {
          const today = new Date()
          const minBirthDate = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate(),
          )
          return date <= minBirthDate
        },
        {
          message: 'You must be at least 13 years old',
        },
      ),
    gender: z.enum(['male', 'female'], { error: 'Gender is required' }),
    password: passwordSchema,
    rePassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
  })

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    rePassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword !== data.password, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>
