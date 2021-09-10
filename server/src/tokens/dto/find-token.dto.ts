import { User } from 'src/users/user.entity'

export class FindTokenDto {
  readonly value?: string
  readonly user?: User
}