import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, UsePipes } from '@nestjs/common'
import { PatientsService } from './patients.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { ParseDatePipe } from 'src/pipes/parse-date.pipe'

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UsePipes(ParseDatePipe, ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePatientDto) {
    return {
      message: 'Пациент успешно добавлен',
      ...await this.patientsService.create(dto)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return {
      patients: await this.patientsService.getAll()
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return {
      patient: await this.patientsService.getById(+id)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(ParseDatePipe, ValidationPipe) dto: UpdatePatientDto) {
    return {
      message: 'Данные о пациенте успешно изменены',
      patient: await this.patientsService.update(+id, dto)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patientsService.remove(+id)
    return {
      message: 'Пациент успешно удален'
    }
  }
}
