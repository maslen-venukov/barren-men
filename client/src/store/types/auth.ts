import { User } from './users'

export type AuthUser = Pick<User, 'id' | 'login' | 'email' | 'role'>

export interface AuthState {
  auth: boolean
  ready: boolean
  user: AuthUser | null
}