import { PartialType } from '@nestjs/mapped-types'
import { CreatePatientsGroupDto } from './create-patients-group.dto'

export class UpdatePatientsGroupDto extends PartialType(CreatePatientsGroupDto) {}