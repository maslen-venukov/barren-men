import { BadRequestException } from '@nestjs/common'
import { IsString, IsDate, MaxDate, IsNotEmpty, IsPhoneNumber } from 'class-validator'
import getTomorrow from 'src/utils/getTomorrow'

export class CreatePatientDto {
  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия обязательна' })
  readonly lastName: string

  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  readonly firstName: string

  @IsString({ message: 'Отчество должно быть строкой' })
  @IsNotEmpty({ message: 'Отчество обязательно' })
  readonly patronymic: string

  @MaxDate(getTomorrow(), { message: 'Дата рождения не может быть больше сегодняшней' })
  @IsDate({ message: 'Некорректный формат даты рождения' })
  @IsNotEmpty({ message: 'Дата рождения обазательна' })
  readonly birthDate: Date

  @MaxDate(getTomorrow(), { message: 'Дата постановки диагноза бесплодия не может быть больше сегодняшней' })
  @IsDate({ message: 'Некорректный формат даты постановки диагноза бесплодия' })
  @IsNotEmpty({ message: 'Дата постановки диагноза бесплодия обазательна' })
  readonly infertilityDate: Date

  @IsPhoneNumber('RU', {
    message: ({ value }) => {
      if(!value.match(/\+7 (\d{3}) \d{3}-\d{2}-\d{2}/)) {
        throw new BadRequestException('Некорректный формат номера телефона')
      }
      return value
    }
  })
  @IsNotEmpty({ message: 'Номер телефона обязателен' })
  readonly phone: string

  @IsString({ message: 'Адрес должен быть строкой' })
  @IsNotEmpty({ message: 'Адрес обязателен' })
  readonly address: string
}