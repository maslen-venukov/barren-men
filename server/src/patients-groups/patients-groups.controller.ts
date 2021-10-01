import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, UsePipes } from '@nestjs/common'
import { PatientsGroupsService } from './patients-groups.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreatePatientsGroupDto } from './dto/create-patients-group.dto'
import { UpdatePatientsGroupDto } from './dto/update-patients-group.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'

@Controller('patients-groups')
export class PatientsGroupsController {
  constructor(private readonly patientsGroupsService: PatientsGroupsService) {}

  @UsePipes(ValidationPipe)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) dto: UpdatePatientsGroupDto) {
    return {
      message: 'Группа успешно обновлена',
      patientsGroup: await this.patientsGroupsService.update(+id, dto)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patientsGroupsService.remove(+id)
    return {
      message: 'Группа успешно удалена'
    }
  }
}
