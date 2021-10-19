import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Analysis } from './analysis.entity'
import { CreateAnalysisDto } from './dto/create-analysis.dto'
import { UpdateAnalysisDto } from './dto/update-analysis.dto'
import { PatientsService } from 'src/patients/patients.service'
import { AnalysisIndicatorsService } from 'src/analysis-indicators/analysis-indicators.service'
import { IndicatorsService } from 'src/indicators/indicators.service'
import { Exception } from 'src/enums/exception.enum'

@Injectable()
export class AnalyzesService {
  constructor(
    @InjectRepository(Analysis) private analysisRepository: Repository<Analysis>,
    private analysisIndicatorsService: AnalysisIndicatorsService,
    private patientsService: PatientsService,
    private indicatorsService: IndicatorsService
  ) {}

  async getByPatientId(patientId: number) {
    const patient = await this.patientsService.getById(patientId)

    const analyzes = await this.analysisRepository.find({
      where: {
        patientId: patient.id
      },
      relations: ['indicators']
    })

    return await Promise.all(analyzes.map(async analysis => {
      const group = await this.indicatorsService.getGroupByIndicatorId(analysis.indicators[0].indicatorId)

      return {
        ...analysis,
        indicators: analysis.indicators.sort((a, b) => b.indicatorId - a.indicatorId),
        groupId: group.id
      }
    }))
  }

  async create(dto: CreateAnalysisDto) {
    if(!dto.indicators.length) {
      throw new BadRequestException(Exception.IndicatorsListEmpty)
    }

    const patient = await this.patientsService.getById(dto.patientId)

    const entity = this.analysisRepository.create({
      date: dto.date,
      stage: dto.stage,
      patientId: patient.id
    })
    const analysis = await this.analysisRepository.save(entity)

    const indicatorsDtos = dto.indicators.map(indicator => ({ ...indicator, analysisId: analysis.id }))
    const indicators = await this.analysisIndicatorsService.create(indicatorsDtos)
    analysis.indicators = indicators

    const group = await this.indicatorsService.getGroupByIndicatorId(indicators[0].indicatorId)

    return {
      ...analysis,
      indicators: this.sortIndicators(analysis),
      groupId: group.id
    }
  }

  async update(id: number, dto: UpdateAnalysisDto) {
    if(!dto.indicators.length) {
      throw new BadRequestException(Exception.IndicatorsListEmpty)
    }

    const analysis = await this.getByIdWithIndicators(id)

    if(!analysis) {
      throw new NotFoundException(Exception.AnalysisNotFound)
    }

    await this.analysisRepository.update(id, {
      date: dto.date,
      stage: dto.stage
    })

    await this.analysisIndicatorsService.update(id, dto.indicators)

    const group = await this.indicatorsService.getGroupByIndicatorId(analysis.indicators[0].indicatorId)

    return {
      ...await this.getByIdWithIndicators(id),
      groupId: group.id
    }
  }

  remove(id: number) {
    return this.analysisRepository.delete(id)
  }

  private sortIndicators(analysis: Analysis) {
    return analysis.indicators.sort((a, b) => b.indicatorId - a.indicatorId)
  }

  private async getByIdWithIndicators(id: number) {
    const analysis = await this.analysisRepository.findOne(id, {
      relations: ['indicators']
    })

    return {
      ...analysis,
      indicators: this.sortIndicators(analysis)
    }
  }
}
