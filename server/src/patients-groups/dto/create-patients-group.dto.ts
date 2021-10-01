import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator'

export class CreatePatientsGroupDto {
  @Min(1, { message: 'Номер должен быть не меньше 1' })
  @IsInt({ message: 'Номер должен быть целым числом' })
  @IsNotEmpty({ message: 'Номер обязателен' })
  readonly number: number

  @IsString({ message: 'Описание должно быть строкой' })
  @IsNotEmpty({ message: 'Описание обязательно' })
  readonly description: string
}