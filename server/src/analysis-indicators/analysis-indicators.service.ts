import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AnalysisIndicator } from './analysis-indicator.entity'
import { CreateAnalysisIndicatorDto } from './dto/create-analysis-indicator.dto'
import { UpdateAnalysisIndicatorDto } from './dto/update-analysis-indicator.dto'

@Injectable()
export class AnalysisIndicatorsService {
  constructor(@InjectRepository(AnalysisIndicator) private analysisIndicatorRepository: Repository<AnalysisIndicator>) {}

  async create(dtos: CreateAnalysisIndicatorDto[]) {
    const { raw } = await this.analysisIndicatorRepository.createQueryBuilder()
      .insert()
      .into(AnalysisIndicator)
      .values(dtos)
      .returning('*')
      .execute()
    return raw
  }

  async update(analysisId: number, dtos: UpdateAnalysisIndicatorDto[]) {
    dtos.forEach(async dto => {
      const indicator = await this.analysisIndicatorRepository.findOne({
        indicatorId: dto.indicatorId,
        analysisId
      })

      indicator.value = dto.value
      await this.analysisIndicatorRepository.save(indicator)
    })
  }
}
