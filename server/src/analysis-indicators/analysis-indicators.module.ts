import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnalysisIndicatorsService } from './analysis-indicators.service'
import { AnalysisIndicator } from './analysis-indicator.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AnalysisIndicator])],
  providers: [AnalysisIndicatorsService],
  exports: [AnalysisIndicatorsService]
})
export class AnalysisIndicatorsModule {}
