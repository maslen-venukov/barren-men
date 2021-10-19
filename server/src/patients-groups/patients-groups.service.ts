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
      throw new BadRequestException(Exception.GroupAlreadyExists)
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
      throw new NotFoundException(Exception.GroupNotFound)
    }
    return patientsGroup
  }

  async update(id: number, dto: UpdatePatientsGroupDto) {
    const patientsGroup = await this.patientsGroupsRepository.findOne(id)
    if(!patientsGroup) {
      throw new NotFoundException(Exception.GroupNotFound)
    }
    await this.patientsGroupsRepository.update(id, dto)
    return this.patientsGroupsRepository.findOne(id)
  }

  async remove(id: number) {
    const patientsGroup = await this.patientsGroupsRepository.findOne(id)
    if(!patientsGroup) {
      throw new NotFoundException(Exception.GroupNotFound)
    }
    return await this.patientsGroupsRepository.remove(patientsGroup)
  }

  async getGroupToInsert(date: Date) {
    const groups = await this.getWithPatients()

    const smallests = this.findSmallests(groups)
    const avgs = this.countAvgs(smallests)
    const { min, max } = this.findMinAndMax(avgs)

    const resultGroupIndex = this.getResultGroupIndex(date.getTime(), min, max, avgs)
    return smallests[resultGroupIndex]
  }

  private countAvgs(groups: PatientsGroup[]) {
    return groups.map(group => {
      const sum = group.patients.reduce((acc, el) => acc += el.birthDate.getTime(), 0)
      return (sum / group.patients.length) || 0
    })
  }

  private findSmallests(groups: PatientsGroup[]) {
    const firstSmallest = groups.reduce((acc, group) => (
      group.patients.length < acc.patients.length ? group : acc
    ), groups[0])

    return groups.reduce((acc: PatientsGroup[], el) => (
      el.patients.length === firstSmallest.patients.length ? [...acc, el] : acc
    ), [])
  }

  private findMinAndMax(nums: number[]) {
    const firstNum = nums[0]
    const count = (callback: (acc: number, el: number) => number) => nums.reduce(callback, firstNum)

    return {
      min: count((acc, el) => el < acc ? el : acc),
      max: count((acc, el) => el > acc ? el: acc)
    }
  }

  private findClosest(arr: number[], num: number) {
    return arr.reduce((acc, el) => (
      Math.abs(el - num) < Math.abs(acc - num) ? el : acc
    ))
  }

  private getResultGroupIndex(
    date: number,
    min: number,
    max: number,
    avgs: number[]
  ) {
    if(date > max) {
      return avgs.findIndex(el => el === min)
    }

    if(date < min) {
      return avgs.findIndex(el => el === max)
    }

    const closest = this.findClosest(avgs, date)
    return avgs.findIndex(el => el === closest)
  }
}
