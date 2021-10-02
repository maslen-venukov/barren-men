import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards } from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { CreateIndicatorDto } from './dto/create-indicator.dto'
import { UpdateIndicatorDto } from './dto/update-indicator.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { Role } from 'src/enums/role.enum'

@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @UsePipes(ValidationPipe)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateIndicatorDto) {
    return {
      message: 'Показатель успешно создан',
      indicator: await this.indicatorsService.create(dto)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return {
      indicators: await this.indicatorsService.getAll()
    }
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) dto: UpdateIndicatorDto) {
    return {
      message: 'Показатель успешно обновлен',
      indicator: await this.indicatorsService.update(+id, dto)
    }
  }

  @UsePipes(ValidationPipe)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.indicatorsService.remove(+id)
    return {
      message: 'Показатель успешно удален'
    }
  }
}
