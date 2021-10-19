import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, MaxDate, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import getTomorrow from 'src/utils/getTomorrow'

export class Indicator {
  @IsString()
  @IsNotEmpty()
  readonly value: string

  @IsInt()
  @IsNotEmpty()
  readonly indicatorId: number
}

export class CreateAnalysisDto {
  @MaxDate(getTomorrow(), { message: 'Дата анализа не может быть больше сегодняшней' })
  @IsDate({ message: 'Некорректный формат даты анализа' })
  @IsNotEmpty({ message: 'Дата анализа обазательна' })
  readonly date: Date

  @IsInt({ message: 'Номер этапа должен быть целым числом' })
  @IsNotEmpty({ message: 'Номер этапа обязателен' })
  readonly stage: number

  @IsInt({ message: 'Идентификатр пациента должен быть целым числом' })
  @IsNotEmpty({ message: 'Идентификатр пациента обязателен' })
  readonly patientId: number

  @ValidateNested({ each: true })
  @Type(() => Indicator)
  @IsArray({ message: 'Список показателей должен быть массивом' })
  @IsNotEmpty({ message: 'Список показателей обязателен' })
  readonly indicators: Indicator[]
}
