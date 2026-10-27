import { PASSWORD_RULE_CHECKS } from '../../schemas/auth.schema'

export interface PasswordRulesProps {
  value: string
}

export default function PasswordRules({ value }: PasswordRulesProps) {
  return (
    <ul className="mt-2 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2">
      {PASSWORD_RULE_CHECKS.map((rule) => {
        const passed = rule.test(value)
        return (
          <li
            key={rule.key}
            className={`flex items-center gap-1.5 transition-colors ${
              passed
                ? 'font-medium text-green-600 dark:text-green-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <i
              className={`fa-solid ${
                passed ? 'fa-circle-check text-green-600 dark:text-green-400' : 'fa-circle text-[6px] opacity-60'
              }`}
            ></i>
            <span>{rule.label}</span>
          </li>
        )
      })}
    </ul>
  )
}
