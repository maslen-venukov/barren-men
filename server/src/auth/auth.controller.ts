import { Body, Controller, Req, Res, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
import { RolesGuard } from './roles.guard'
import { Roles } from './roles.decorator'
import { Role } from 'src/enums/role.enum'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { RegisterDto } from './dto/register.dto'
import { ResponseWithCookies } from 'src/interfaces/response-with-cookies.interface'
import { RequestWithCookies } from 'src/interfaces/request-with-cookies.interface'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: ResponseWithCookies) {
    const { refreshToken, ...data } = await this.authService.login(dto)

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    return data
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('register')
  async create(@Body() dto: RegisterDto) {
    return await this.authService.register(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: RequestWithCookies, @Res({ passthrough: true }) res: ResponseWithCookies) {
    await this.authService.logout(req.cookies.refreshToken)
    res.cookie('refreshToken', '', {
      expires: new Date(0)
    })
  }

  @Get('refresh')
  async refresh(@Req() req: RequestWithCookies, @Res({ passthrough: true }) res: ResponseWithCookies) {
    const token = req.cookies.refreshToken
    const { refreshToken, ...data } = await this.authService.refresh(token)

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    return data
  }
}
