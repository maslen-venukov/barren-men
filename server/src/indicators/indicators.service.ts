import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateIndicatorDto } from './dto/create-indicator.dto'
import { UpdateIndicatorDto } from './dto/update-indicator.dto'
import { Indicator } from './entities/indicator.entity'
import { IndicatorsGroupsService } from 'src/indicators-groups/indicators-groups.service'
import { IndicatorsType } from 'src/enums/indicators-type.enum'
import { Exception } from 'src/enums/exception.enum'
import { NumberIndicatorsOptions } from './entities/number-indicators-options.entity'
import { TextIndicatorsOptions } from './entities/text-indicators-options.entity'
import { BooleanIndicatorsOptions } from './entities/boolean-indicators-options.entity'

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectRepository(Indicator) private indicatorsRepository: Repository<Indicator>,
    @InjectRepository(NumberIndicatorsOptions) private numberIndicatorsOptionsRepository: Repository<NumberIndicatorsOptions>,
    @InjectRepository(TextIndicatorsOptions) private textIndicatorsOptionsRepository: Repository<TextIndicatorsOptions>,
    @InjectRepository(BooleanIndicatorsOptions) private booleanIndicatorsOptionsRepository: Repository<BooleanIndicatorsOptions>,
    private indicatorsGroupsService: IndicatorsGroupsService
  ) {}

  async create(dto: CreateIndicatorDto) {
    const { name, type, groupId, norm } = dto

    const group = await this.indicatorsGroupsService.getById(groupId)
    if(!group) {
      throw new BadRequestException(Exception.GroupNotFound)
    }

    const textTypeException = type === IndicatorsType.Text && !norm && typeof norm !== 'string'
    const booleanTypeException = type === IndicatorsType.Boolean && !norm && typeof norm !== 'boolean'

    if(textTypeException || booleanTypeException) {
      throw new BadRequestException(Exception.IncorrectIndicatorsOptions)
    }

    const indicator = this.indicatorsRepository.create({
      name,
      type,
      groupId
    })

    indicator[`${type}Options`] = await this.getOptions(dto) as any
    return await this.indicatorsRepository.save(indicator)
  }

  async getGroupByIndicatorId(id: number) {
    const indicator = await this.indicatorsRepository.findOne(id, {
      relations: ['group']
    })
    if(!indicator) {
      throw new NotFoundException(Exception.IndicatorNotFound)
    }
    return indicator.group
  }

  getAll() {
    return this.indicatorsRepository.find()
  }

  async update(id: number, dto: UpdateIndicatorDto) {
    const indicator = await this.indicatorsRepository.findOne(id)
    if(!indicator) {
      throw new NotFoundException(Exception.IndicatorNotFound)
    }
    await this.indicatorsRepository.update(id, dto)
    return await this.indicatorsRepository.findOne(id)
  }

  async remove(id: number) {
    const indicator = await this.indicatorsRepository.findOne(+id)
    if(!indicator) {
      throw new NotFoundException(Exception.IndicatorNotFound)
    }
    return await this.indicatorsRepository.remove(indicator)
  }

  private async getOptions(dto: CreateIndicatorDto) {
    switch(dto.type) {
      case IndicatorsType.Number: {
        const numberOptions = this.numberIndicatorsOptionsRepository.create({
          min: dto.min,
          minNorm: dto.minNorm,
          maxNorm: dto.maxNorm,
          max: dto.max,
          units: dto.units
        })
        return await this.numberIndicatorsOptionsRepository.save(numberOptions)
      }

      case IndicatorsType.Text: {
        const textOptions = this.textIndicatorsOptionsRepository.create({
          norm: dto.norm as string
        })
        return await this.textIndicatorsOptionsRepository.save(textOptions)
      }

      case IndicatorsType.Boolean: {
        const booleanOptions = this.booleanIndicatorsOptionsRepository.create({
          norm: dto.norm as boolean
        })
        return await this.booleanIndicatorsOptionsRepository.save(booleanOptions)
      }

      default:
        return null
    }
  }
}
