import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IndicatorsService } from './indicators.service'
import { IndicatorsController } from './indicators.controller'
import { Indicator } from './entities/indicator.entity'
import { NumberIndicatorsOptions } from './entities/number-indicators-options.entity'
import { TextIndicatorsOptions } from './entities/text-indicators-options.entity'
import { BooleanIndicatorsOptions } from './entities/boolean-indicators-options.entity'
import { AuthModule } from 'src/auth/auth.module'
import { IndicatorsGroupsModule } from 'src/indicators-groups/indicators-groups.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Indicator,
      NumberIndicatorsOptions,
      TextIndicatorsOptions,
      BooleanIndicatorsOptions
    ]),
    AuthModule,
    IndicatorsGroupsModule
  ],
  controllers: [IndicatorsController],
  providers: [IndicatorsService],
  exports: [IndicatorsService]
})
export class IndicatorsModule {}
