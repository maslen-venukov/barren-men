import { PatientsGroup } from './patientsGroups'

export interface Patient {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  birthDate: Date
  infertilityDate: Date
  phone: string
  address: string
}

export interface PatientsGroupWithPatients extends PatientsGroup {
  patients: Patient[]
}

export interface CurrentPatient extends Patient {
  group: PatientsGroup
}

export interface PatientsState {
  loading: boolean
  patients: PatientsGroupWithPatients[]
  currentPatient: CurrentPatient | null
}

export interface CreatePatient extends Omit<Patient, 'id'> {}

export interface UpdatePatient extends Partial<CreatePatient> {}