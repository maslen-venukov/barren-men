import { PartialType } from '@nestjs/mapped-types'
import { CreateIndicatorsGroupDto } from './create-indicators-group.dto'

export class UpdateIndicatorsGroupDto extends PartialType(CreateIndicatorsGroupDto) {}
