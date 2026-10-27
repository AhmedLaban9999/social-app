import { forwardRef, useState, type ComponentProps, type InputHTMLAttributes, type ReactNode } from 'react'
import { TextInput } from 'flowbite-react'

type FlowbiteIconProp = ComponentProps<typeof TextInput>['icon']

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  label?: string
  error?: string
  helperText?: string
  icon?: FlowbiteIconProp
  sizing?: 'sm' | 'md' | 'lg'
  variant?: 'flowbite' | 'native'
  showPasswordToggle?: boolean
  children?: ReactNode
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  {
    label,
    error,
    helperText,
    icon,
    sizing,
    variant = 'flowbite',
    showPasswordToggle = false,
    children,
    className,
    type,
    ...inputProps
  },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false)
  const errorMargin = variant === 'native' ? 'mt-2' : 'mt-1'
  const resolvedType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type

  return (
    <div>
      {label && <label className="mb-2 block font-bold text-gray-800 dark:text-gray-200">{label}</label>}
      {children ? (
        children
      ) : (
        <div className="relative">
          {variant === 'native' ? (
            <input
              ref={ref}
              type={resolvedType}
              className={
                className ??
                `w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-gray-900 placeholder-gray-400 ${showPasswordToggle ? 'pe-11' : ''} focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`
              }
              {...inputProps}
            />
          ) : (
            <TextInput
              ref={ref}
              type={resolvedType}
              sizing={sizing}
              icon={icon}
              color={error ? 'failure' : 'gray'}
              className={`${showPasswordToggle ? '[&_input]:pe-11' : ''} ${className ?? ''}`.trim()}
              {...inputProps}
            />
          )}
          {showPasswordToggle && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          )}
        </div>
      )}
      {error ? (
        <p className={`${errorMargin} text-sm text-red-500 dark:text-red-400`}>{error}</p>
      ) : helperText ? (
        <p className={`${errorMargin} text-sm text-gray-500 dark:text-gray-400`}>{helperText}</p>
      ) : null}
    </div>
  )
})

export default FormField
