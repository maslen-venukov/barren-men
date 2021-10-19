import { OmitType } from '@nestjs/mapped-types'
import { CreateAnalysisIndicatorDto } from './create-analysis-indicator.dto'

export class UpdateAnalysisIndicatorDto extends OmitType(CreateAnalysisIndicatorDto, ['analysisId']) {}
