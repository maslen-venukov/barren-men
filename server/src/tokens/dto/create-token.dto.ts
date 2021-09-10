import { User } from 'src/users/user.entity'

export class CreateTokenDto {
  readonly value: string
  readonly user: User
}