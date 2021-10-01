import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PatientsService } from './patients.service'
import { PatientsController } from './patients.controller'
import { Patient } from './patient.entity'
import { AuthModule } from 'src/auth/auth.module'
import { PatientsGroupsModule } from 'src/patients-groups/patients-groups.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    AuthModule,
    PatientsGroupsModule
  ],
  controllers: [PatientsController],
  providers: [PatientsService]
})
export class PatientsModule {}
