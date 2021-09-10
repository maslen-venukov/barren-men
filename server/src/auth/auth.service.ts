import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { UsersService } from 'src/users/users.service'
import { TokensService } from 'src/tokens/tokens.service'
import { User } from 'src/users/user.entity'
import { slug } from 'src/utils/slug'
import { generateRandomPassword } from 'src/utils/generateRandomPassword'
import { Exception } from 'src/enums/exception.enum'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
    private mailerService: MailerService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto)
    return await this.saveToken(user)
  }

  async register(dto: RegisterDto) {
    const login = slug(`${dto.firstName} ${dto.lastName}`)
    const candidate = await this.usersService.getByLoginOrEmail(login, dto.email)

    if(candidate) {
      throw new BadRequestException(Exception.UserAlreadyExists)
    }

    const password = generateRandomPassword()
    const hash = bcrypt.hashSync(password, 10)

    return this.mailerService.sendMail({
      to: dto.email,
      subject: 'Данные для входа',
      html: `
        <p>Логин: ${login}</p>
        <p>Пароль: ${password}</p>
      `
    }).then(async () => {
      await this.usersService.create({
        ...dto,
        login,
        password: hash
      })

      return {
        message: 'Пользователь успешно добавлен'
      }
    })
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
      throw new UnauthorizedException(Exception.InvalidLoginData)
    }

    const match = bcrypt.compareSync(dto.password, user.password)
    if(!match) {
      throw new UnauthorizedException(Exception.InvalidLoginData)
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
