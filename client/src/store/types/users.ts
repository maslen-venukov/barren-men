import { Role } from 'enums/Role'

export interface User {
  id: number
  login: string
  email: string
  firstName: string
  lastName: string
  patronymic: string
  role: Role
}

export interface UserState {
  loading: boolean
  users: User[]
}