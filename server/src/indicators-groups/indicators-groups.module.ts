import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IndicatorsGroupsService } from './indicators-groups.service'
import { IndicatorsGroupsController } from './indicators-groups.controller'
import { IndicatorsGroup } from './indicators-group.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([IndicatorsGroup]),
    AuthModule
  ],
  controllers: [IndicatorsGroupsController],
  providers: [IndicatorsGroupsService],
  exports: [IndicatorsGroupsService]
})
export class IndicatorsGroupsModule {}
