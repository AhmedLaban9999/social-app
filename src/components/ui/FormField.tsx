import { forwardRef, type ComponentProps, type InputHTMLAttributes, type ReactNode } from 'react'
import { TextInput } from 'flowbite-react'

type FlowbiteIconProp = ComponentProps<typeof TextInput>['icon']

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  label?: string
  error?: string
  helperText?: string
  icon?: FlowbiteIconProp
  sizing?: 'sm' | 'md' | 'lg'
  variant?: 'flowbite' | 'native'
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
    children,
    className,
    ...inputProps
  },
  ref,
) {
  const errorMargin = variant === 'native' ? 'mt-2' : 'mt-1'

  return (
    <div>
      {label && <label className="mb-2 block font-bold text-gray-800">{label}</label>}
      {children ? (
        children
      ) : variant === 'native' ? (
        <input
          ref={ref}
          className={
            className ??
            'w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:ring-blue-500'
          }
          {...inputProps}
        />
      ) : (
        <TextInput
          ref={ref}
          sizing={sizing}
          icon={icon}
          color={error ? 'failure' : 'gray'}
          className={className}
          {...inputProps}
        />
      )}
      {error ? (
        <p className={`${errorMargin} text-sm text-red-500`}>{error}</p>
      ) : helperText ? (
        <p className={`${errorMargin} text-sm text-gray-500`}>{helperText}</p>
      ) : null}
    </div>
  )
})

export default FormField
