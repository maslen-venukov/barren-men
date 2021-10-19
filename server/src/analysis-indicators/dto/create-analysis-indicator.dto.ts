import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateAnalysisIndicatorDto {
  @IsString({ message: 'Значение должно быть строкой' })
  @IsNotEmpty({ message: 'Значение обязательно' })
  readonly value: string

  @IsInt({ message: 'Идентификатор анализа должен быть целым числом' })
  @IsNotEmpty({ message: 'Идентификатор анализа обязателен' })
  readonly analysisId: number

  @IsInt({ message: 'Идентификатор показателя должен быть целым числом' })
  @IsNotEmpty({ message: 'Идентификатор показателя обязателен' })
  readonly indicatorId: number
}
