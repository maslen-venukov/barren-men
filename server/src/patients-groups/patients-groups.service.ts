import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PatientsGroup } from './patients-group.entity'
import { CreatePatientsGroupDto } from './dto/create-patients-group.dto'
import { UpdatePatientsGroupDto } from './dto/update-patients-group.dto'
import { Exception } from 'src/enums/exception.enum'

@Injectable()
export class PatientsGroupsService {
  constructor(@InjectRepository(PatientsGroup) private patientsGroupsRepository: Repository<PatientsGroup>) {}

  async create(dto: CreatePatientsGroupDto) {
    const candidate = await this.patientsGroupsRepository.findOne({ number: dto.number })
    if(candidate) {
      throw new BadRequestException(Exception.PatientsGroupAlreadyExists)
    }
    const patientsGroup = this.patientsGroupsRepository.create(dto)
    return await this.patientsGroupsRepository.save(patientsGroup)
  }

  getAll() {
    return this.patientsGroupsRepository.find({
      order: {
        number: 'ASC'
      }
    })
  }

  async getWithPatients() {
    const groups = await this.patientsGroupsRepository.find({
      order: {
        number: 'ASC'
      },
      relations: ['patients']
    })
    return groups.map(group => ({
      ...group,
      patients: group.patients.sort((a, b) => a.lastName.localeCompare(b.lastName))
    }))
  }

  async getById(id: number) {
    const patientsGroup = await this.patientsGroupsRepository.findOne(id)
    if(!patientsGroup) {
      throw new NotFoundException(Exception.PatientsGroupNotFound)
    }
    return patientsGroup
  }

  async update(id: number, dto: UpdatePatientsGroupDto) {
    const patientsGroup = await this.patientsGroupsRepository.findOne(id)
    if(!patientsGroup) {
      throw new NotFoundException(Exception.PatientsGroupNotFound)
    }
    await this.patientsGroupsRepository.update(id, dto)
    return this.patientsGroupsRepository.findOne(id)
  }

  async remove(id: number) {
    const patientsGroup = await this.patientsGroupsRepository.findOne(id)
    if(!patientsGroup) {
      throw new NotFoundException(Exception.PatientsGroupNotFound)
    }
    return await this.patientsGroupsRepository.remove(patientsGroup)
  }

  async getSmallest() {
    const groups = await this.patientsGroupsRepository.find({ relations: ['patients']})
    return groups.reduce((acc, group) => group.patients.length < acc.patients.length ? group : acc, groups[0])
  }
}
