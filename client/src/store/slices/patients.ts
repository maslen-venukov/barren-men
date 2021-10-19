import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentPatient, Patient, PatientsGroupWithPatients, PatientsState } from '../types/patients'

const initialState: PatientsState = {
  loading: false,
  patients: [],
  currentPatient: null
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatients(state, action: PayloadAction<PatientsGroupWithPatients[]>) {
      state.patients = action.payload
    },
    setCurrentPatient(state, action: PayloadAction<CurrentPatient | null>) {
      state.currentPatient = action.payload
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
    updateCurrentPatient(state, action: PayloadAction<Patient>) {
      state.currentPatient = state.currentPatient ? {
        group: state.currentPatient.group,
        ...action.payload
      } : null
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export const {
  setPatients,
  setCurrentPatient,
  createPatient,
  updatePatient,
  removePatient,
  updateCurrentPatient,
  setLoading
} = patientsSlice.actions

export default patientsSlice.reducer