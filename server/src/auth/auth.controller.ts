import { Body, Controller, Req, Res, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
import { ValidationPipe } from 'src/pipes/validation.pipe'
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
