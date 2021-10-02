import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards } from '@nestjs/common'
import { IndicatorsGroupsService } from './indicators-groups.service'
import { CreateIndicatorsGroupDto } from './dto/create-indicators-group.dto'
import { UpdateIndicatorsGroupDto } from './dto/update-indicators-group.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { Role } from 'src/enums/role.enum'

@Controller('indicators-groups')
export class IndicatorsGroupsController {
  constructor(private readonly indicatorsGroupsService: IndicatorsGroupsService) {}

  @UsePipes(ValidationPipe)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateIndicatorsGroupDto) {
    return {
      message: 'Группа успешно создана',
      indicatorsGroup: await this.indicatorsGroupsService.create(dto)
    }
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) dto: UpdateIndicatorsGroupDto) {
    return {
      message: 'Группа успешно обновлена',
      indicatorsGroup: await this.indicatorsGroupsService.update(+id, dto)
    }
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.indicatorsGroupsService.remove(+id)
    return {
      message: 'Группа успешно удалена'
    }
  }
}
