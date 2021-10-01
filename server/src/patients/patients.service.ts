import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Patient } from './patient.entity'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { Exception } from 'src/enums/exception.enum'
import { PatientsGroupsService } from 'src/patients-groups/patients-groups.service'

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientsRepository: Repository<Patient>,
    private patientsGroupsService: PatientsGroupsService
  ) {}

  async create(dto: CreatePatientDto) {
    const patient = this.patientsRepository.create(dto)
    const group = await this.patientsGroupsService.getGroupToInsert(dto.birthDate)
    patient.groupId = group.id
    await this.patientsRepository.save(patient)
    return {
      patient: await this.patientsRepository.findOne(patient.id),
      groupId: patient.groupId
    }
  }

  getAll() {
    return this.patientsGroupsService.getWithPatients()
  }

  async getById(id: number) {
    const patient = await this.patientsRepository.findOne(+id, {
      relations: ['group']
    })
    if(!patient) {
      throw new NotFoundException(Exception.PatientNotFound)
    }
    return patient
  }

  async update(id: number, dto: UpdatePatientDto) {
    const patient = await this.patientsRepository.findOne(id)
    if(!patient) {
      throw new NotFoundException(Exception.PatientNotFound)
    }
    await this.patientsRepository.update(id, dto)
    return await this.patientsRepository.findOne(id)
  }

  async remove(id: number) {
    const patient = await this.patientsRepository.findOne(+id)
    if(!patient) {
      throw new NotFoundException(Exception.PatientNotFound)
    }
    return await this.patientsRepository.remove(patient)
  }
}
