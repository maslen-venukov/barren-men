import { IsString, IsNotEmpty, IsIn, IsInt, IsNumber, IsOptional } from 'class-validator'
import { IndicatorsType } from 'src/types/indicatores-type.type'

export class CreateIndicatorDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязателено' })
  readonly name: string

  @IsIn(['number', 'text', 'boolean'], { message: 'Тип должен быть "number", "text" или "boolean"' })
  @IsNotEmpty({ message: 'Тип обязателен' })
  readonly type: IndicatorsType

  @IsInt({ message: 'Идентификатр группы должен быть целым числом' })
  @IsNotEmpty({ message: 'Идентификатр группы обязателен' })
  readonly groupId: number

  // type number
  @IsNumber({}, { message: 'Минимальное значение должно быть числом' })
  @IsOptional()
  readonly min?: number

  @IsNumber({}, { message: 'Минимальное значение нормы должно быть числом' })
  @IsOptional()
  readonly minNorm?: number

  @IsNumber({}, { message: 'Максимальное значение нормы должно быть числом' })
  @IsOptional()
  readonly maxNorm?: number

  @IsNumber({}, { message: 'Минимальное значение должно быть числом' })
  @IsOptional()
  readonly max?: number

  @IsString({ message: 'Единицы измерения должны быть строкой' })
  @IsOptional()
  readonly units?: string

  // type text | boolean
  @IsOptional()
  readonly norm?: string | boolean
}