import { signin as signinApi, signup as signupApi, type SigninBody } from '../api/auth.api'

export function useAuthActions() {
  return {
    signin: (values: SigninBody) => signinApi(values),
    signup: <T extends object>(values: T) => signupApi(values),
  }
}
