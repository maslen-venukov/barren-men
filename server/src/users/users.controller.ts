import { Controller, Get, Post, Delete, Body, Param, UseGuards, UsePipes } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { Role } from 'src/enums/role.enum'
import { ValidationPipe } from 'src/pipes/validation.pipe'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return {
      message: 'Пользователь успешно добавлен',
      user: await this.usersService.create(dto)
    }
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getOperators() {
    return {
      users: await this.usersService.getOperators()
    }
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id)
    return {
      message: 'Пользователь успешно удален'
    }
  }
}
