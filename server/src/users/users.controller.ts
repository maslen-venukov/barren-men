import { Controller, Get, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { Role } from 'src/enums/role.enum'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAll()
  }
}
