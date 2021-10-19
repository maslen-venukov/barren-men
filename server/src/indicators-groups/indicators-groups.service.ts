import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IndicatorsGroup } from './indicators-group.entity'
import { CreateIndicatorsGroupDto } from './dto/create-indicators-group.dto'
import { UpdateIndicatorsGroupDto } from './dto/update-indicators-group.dto'
import { Exception } from 'src/enums/exception.enum'

@Injectable()
export class IndicatorsGroupsService {
  @InjectRepository(IndicatorsGroup) private indicatorsGroupsRepository: Repository<IndicatorsGroup>

  async create(dto: CreateIndicatorsGroupDto) {
    const candidate = await this.indicatorsGroupsRepository.findOne({ name: dto.name })
    if(candidate) {
      throw new BadRequestException(Exception.GroupAlreadyExists)
    }
    const patientsGroup = this.indicatorsGroupsRepository.create(dto)
    return await this.indicatorsGroupsRepository.save(patientsGroup)
  }

  getAll() {
    return this.indicatorsGroupsRepository.find({
      order: {
        id: 'ASC'
      }
    })
  }

  getById(id: number) {
    return this.indicatorsGroupsRepository.findOne(id)
  }

  async update(id: number, dto: UpdateIndicatorsGroupDto) {
    const indicatorsGroup = await this.indicatorsGroupsRepository.findOne(id)
    if(!indicatorsGroup) {
      throw new NotFoundException(Exception.GroupNotFound)
    }
    await this.indicatorsGroupsRepository.update(id, dto)
    return this.indicatorsGroupsRepository.findOne(id)
  }

  async remove(id: number) {
    const indicatorsGroup = await this.indicatorsGroupsRepository.findOne(id)
    if(!indicatorsGroup) {
      throw new NotFoundException(Exception.GroupNotFound)
    }
    return await this.indicatorsGroupsRepository.remove(indicatorsGroup)
  }
}
