import { IsEmail, IsString } from 'class-validator'

export class RegisterDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString({ message: 'Email должен быть строкой' })
  readonly email: string

  @IsString({ message: 'Имя должно быть строкой' })
  readonly firstName: string

  @IsString({ message: 'Фамилия должна быть строкой' })
  readonly lastName: string

  @IsString({ message: 'Отчество должно быть строкой' })
  readonly patronymic: string
}