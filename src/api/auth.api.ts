import { api } from './client'

export interface SigninBody {
  email: string
  password: string
}

export interface ChangePasswordBody {
  password: string
  newPassword: string
}

export function signin(body: SigninBody) {
  return api.post('/users/signin', body)
}

export function signup<T extends object>(body: T) {
  return api.post('/users/signup', body)
}

export function getProfile() {
  return api.get('/users/profile-data')
}

export function changePassword(body: ChangePasswordBody) {
  return api.patch('/users/change-password', body)
}
