import { Controller, Get, Post, Body, Delete, UseGuards, Query, Param, Patch } from '@nestjs/common'
import { AnalyzesService } from './analyzes.service'
import { CreateAnalysisDto } from './dto/create-analysis.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { ParseDatePipe } from 'src/pipes/parse-date.pipe'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UpdateAnalysisDto } from './dto/update-analysis.dto'

@Controller('analyzes')
export class AnalyzesController {
  constructor(private readonly analyzesService: AnalyzesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ParseDatePipe, ValidationPipe) dto: CreateAnalysisDto) {
    return {
      message: 'Анализ успешно добален',
      analysis: await this.analyzesService.create(dto)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getByPatientId(@Query('patientId') patientId: string) {
    return {
      analyzes: await this.analyzesService.getByPatientId(+patientId)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.analyzesService.remove(+id)
    return {
      message: 'Анализ успешно удален'
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(ParseDatePipe, ValidationPipe) dto: UpdateAnalysisDto) {
    return {
      message: 'Анализ успешно изменен',
      analysis: await this.analyzesService.update(+id, dto)
    }
  }
}
