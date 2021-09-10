import { IsString } from 'class-validator'

export class LoginDto {
  @IsString({ message: 'Логин или email должен быть строкой' })
  readonly loginOrEmail: string

  @IsString({ message: 'Пароль должно быть строкой' })
  readonly password: string
}