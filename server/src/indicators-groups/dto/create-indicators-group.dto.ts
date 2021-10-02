import { IsNotEmpty, IsString } from 'class-validator'

export class CreateIndicatorsGroupDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  name: string
}
