import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PatientsGroup, PatientsGroupsState } from '../types/patientsGroups'

const initialState: PatientsGroupsState = {
  loading: false,
  patientsGroups: []
}

const patientsGroupsSlice = createSlice({
  name: 'patientsGroups',
  initialState,
  reducers: {
    setPatientsGroups(state, action: PayloadAction<PatientsGroup[]>) {
      state.patientsGroups = action.payload
    },
    createPatientsGroup(state, action: PayloadAction<PatientsGroup>) {
      state.patientsGroups = [...state.patientsGroups, action.payload].sort((a, b) => a.number - b.number)
    },
    updatePatientsGroup(state, action: PayloadAction<PatientsGroup>) {
      state.patientsGroups = state.patientsGroups
        .map(group => group.id === action.payload.id ? action.payload : group)
        .sort((a, b) => a.number - b.number)
    },
    removePatientsGroup(state, action: PayloadAction<number>) {
      state.patientsGroups = state.patientsGroups.filter(group => group.id !== action.payload)
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export const {
  setPatientsGroups,
  createPatientsGroup,
  updatePatientsGroup,
  removePatientsGroup,
  setLoading
} = patientsGroupsSlice.actions

export default patientsGroupsSlice.reducer