import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString({ message: 'Email должен быть строкой' })
  @IsNotEmpty({ message: 'Email обязателен' })
  readonly email: string

  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  readonly firstName: string

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия обязательна' })
  readonly lastName: string

  @IsString({ message: 'Отчество должно быть строкой' })
  @IsNotEmpty({ message: 'Отчество обязательно' })
  readonly patronymic: string
}