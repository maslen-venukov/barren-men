import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PatientsGroupsService } from './patients-groups.service'
import { PatientsGroupsController } from './patients-groups.controller'
import { PatientsGroup } from './patients-group.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientsGroup]),
    AuthModule
  ],
  controllers: [PatientsGroupsController],
  providers: [PatientsGroupsService],
  exports: [PatientsGroupsService]
})
export class PatientsGroupsModule {}
