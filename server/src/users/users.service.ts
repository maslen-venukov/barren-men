import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MailerService } from '@nestjs-modules/mailer'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { slug } from 'src/utils/slug'
import { generateRandomPassword } from 'src/utils/generateRandomPassword'
import { Exception } from 'src/enums/exception.enum'
import { Role } from 'src/enums/role.enum'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private mailerService: MailerService
  ) {}

  async create(dto: CreateUserDto) {
    const login = slug(`${dto.firstName} ${dto.lastName}`)
    const candidate = await this.getByLoginOrEmail(login, dto.email)

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
    })
    .then(async () => {
      const user = this.usersRepository.create({
        ...dto,
        login,
        password: hash
      })
      await this.usersRepository.save(user)

      return {
        id: user.id,
        login: user.login,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        patronymic: user.patronymic,
        role: user.role
      }
    })
    .catch(() => {
      throw new BadRequestException(Exception.SendingEmailFailed)
    })
  }

  async getOperators() {
    const users = await this.usersRepository.find({ role: Role.Operator })
    return users.map(user => {
      const { password, ...rest } = user
      return rest
    })
  }

  async getById(id: number) {
    return await this.usersRepository.findOne(id)
  }

  async getByLoginOrEmail(login: string, email: string) {
    return await this.usersRepository.findOne({
      where: [{ login }, { email }]
    })
  }

  async remove(id: number) {
    const user = await this.getById(id)
    await this.usersRepository.remove(user)
  }
}
