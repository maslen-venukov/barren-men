import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Token } from './token.entity'
import { CreateTokenDto } from './dto/create-token.dto'
import { FindTokenDto } from './dto/find-token.dto'

@Injectable()
export class TokensService {
  constructor(@InjectRepository(Token) private tokensRepository: Repository<Token>) {}

  async save(dto: CreateTokenDto) {
    const token = await this.getOne({ user: dto.user })
    if(token) {
      token.value = dto.value
      return await this.tokensRepository.save(token)
    }
    return await this.create(dto)
  }

  async remove(value: string) {
    const token = await this.tokensRepository.findOne({ value })
    await this.tokensRepository.remove(token)
  }

  async getOne(dto: FindTokenDto) {
    return await this.tokensRepository.findOne(dto)
  }

  private async create(dto: CreateTokenDto) {
    const token = this.tokensRepository.create(dto)
    return await this.tokensRepository.save(token)
  }
}
