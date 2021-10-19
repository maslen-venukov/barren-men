import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IndicatorsGroup, IndicatorsGroupState } from '../types/indicatorsGroups'

const initialState: IndicatorsGroupState = {
  loading: false,
  indicatorsGroups: []
}

const indicatorsGroupsSlice = createSlice({
  name: 'indicatorsGroups',
  initialState,
  reducers: {
    setIndicatorsGroups(state, action: PayloadAction<IndicatorsGroup[]>) {
      state.indicatorsGroups = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export const { setIndicatorsGroups, setLoading } = indicatorsGroupsSlice.actions

export default indicatorsGroupsSlice.reducer