export interface PatientsGroup {
  id: number
  number: number
  description: string
}

export interface PatientsGroupsState {
  loading: boolean
  patientsGroups: PatientsGroup[]
}

export interface CreatePatientsGroup extends Omit<PatientsGroup, 'id'> {}

export interface UpdatePatientsGroup extends Partial<Omit<PatientsGroup, 'id'>> {}