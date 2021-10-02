import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, UsePipes } from '@nestjs/common'
import { PatientsGroupsService } from './patients-groups.service'
import { CreatePatientsGroupDto } from './dto/create-patients-group.dto'
import { UpdatePatientsGroupDto } from './dto/update-patients-group.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { Role } from 'src/enums/role.enum'

@Controller('patients-groups')
export class PatientsGroupsController {
  constructor(private readonly patientsGroupsService: PatientsGroupsService) {}

  @UsePipes(ValidationPipe)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePatientsGroupDto) {
    return {
      message: 'Группа успешно создана',
      patientsGroup: await this.patientsGroupsService.create(dto)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return {
      patientsGroups: await this.patientsGroupsService.getAll()
    }
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) dto: UpdatePatientsGroupDto) {
    return {
      message: 'Группа успешно обновлена',
      patientsGroup: await this.patientsGroupsService.update(+id, dto)
    }
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patientsGroupsService.remove(+id)
    return {
      message: 'Группа успешно удалена'
    }
  }
}
