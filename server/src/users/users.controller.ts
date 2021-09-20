import { Controller, Get, Post, Delete, Body, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { Role } from 'src/enums/role.enum'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
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

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.remove(id)
    return {
      message: 'Пользователь успешно удален'
    }
  }
}
