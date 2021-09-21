import { IsString, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsString({ message: 'Логин или email должен быть строкой' })
  @IsNotEmpty({ message: 'Логин или email обязателен' })
  readonly loginOrEmail: string

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  readonly password: string
}