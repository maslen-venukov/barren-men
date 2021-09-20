import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login.dto'
import { UsersService } from 'src/users/users.service'
import { TokensService } from 'src/tokens/tokens.service'
import { User } from 'src/users/user.entity'
import { Exception } from 'src/enums/exception.enum'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto)
    return await this.saveToken(user)
  }

  async logout(token: string) {
    await this.tokensService.remove(token)
  }

  async refresh(token: string) {
    if(!token) {
      throw new UnauthorizedException(Exception.AuthorizationFailed)
    }

    const data = this.validateRefreshToken(token)
    const tokenFromDatabase = await this.tokensService.getOne({ value: token })

    if(!data || !tokenFromDatabase) {
      throw new UnauthorizedException(Exception.AuthorizationFailed)
    }

    const user = await this.usersService.getById(data.id)
    return await this.saveToken(user)
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.usersService.getByLoginOrEmail(dto.loginOrEmail, dto.loginOrEmail)
    if(!user) {
      throw new UnauthorizedException(Exception.AuthorizationFailed)
    }

    const match = bcrypt.compareSync(dto.password, user.password)
    if(!match) {
      throw new UnauthorizedException(Exception.AuthorizationFailed)
    }

    return user
  }

  private async generateTokens(user: User) {
    const payload = {
      id: user.id,
      login: user.login,
      email: user.email,
      role: user.role
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m'
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d'
    })

    return { accessToken, refreshToken }
  }

  private validateRefreshToken(token: string) {
    try {
      return this.jwtService.verify<User>(token, {
        secret: process.env.JWT_REFRESH_SECRET
      })
    } catch {
      return null
    }
  }

  private async saveToken(user: User) {
    const tokens = await this.generateTokens(user)
    await this.tokensService.save({ value: tokens.refreshToken, user })
    return {
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        role: user.role
      },
      ...tokens
    }
  }
}
