import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Patient, PatientsGroupWithPatients, PatientsState } from '../types/patients'

const initialState: PatientsState = {
  loading: false,
  patients: []
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatients(state, action: PayloadAction<PatientsGroupWithPatients[]>) {
      state.patients = action.payload
    },
    createPatient(state, action: PayloadAction<{
      patient: Patient,
      groupId: number
    }>) {
      state.patients = state.patients.map(group => group.id === action.payload.groupId ? ({
        ...group,
        patients: [action.payload.patient, ...group.patients].sort((a, b) => a.lastName.localeCompare(b.lastName))
      }) : group)
    },
    updatePatient(state, action: PayloadAction<Patient>) {
      state.patients = state.patients.map(group => ({
        ...group,
        patients: group.patients
          .map(patient => patient.id === action.payload.id ? action.payload : patient)
          .sort((a, b) => a.lastName.localeCompare(b.lastName))
      }))
    },
    removePatient(state, action: PayloadAction<number>) {
      state.patients = state.patients.map(group => ({
        ...group,
        patients: group.patients.filter(patient => patient.id !== action.payload)
      }))
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export const {
  setPatients,
  createPatient,
  updatePatient,
  removePatient,
  setLoading
} = patientsSlice.actions

export default patientsSlice.reducer