import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto)
    return await this.usersRepository.save(user)
  }

  async getAll() {
    const users = await this.usersRepository.find()
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
}
