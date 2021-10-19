import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnalyzesService } from './analyzes.service'
import { AnalyzesController } from './analyzes.controller'
import { Analysis } from './analysis.entity'
import { AuthModule } from 'src/auth/auth.module'
import { AnalysisIndicatorsModule } from 'src/analysis-indicators/analysis-indicators.module'
import { PatientsModule } from 'src/patients/patients.module'
import { IndicatorsModule } from 'src/indicators/indicators.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Analysis]),
    AuthModule,
    AnalysisIndicatorsModule,
    PatientsModule,
    IndicatorsModule
  ],
  controllers: [AnalyzesController],
  providers: [AnalyzesService]
})
export class AnalyzesModule {}
