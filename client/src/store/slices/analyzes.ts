import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Analysis, AnalyzesState } from '../types/analyzes'

const initialState: AnalyzesState = {
  loading: false,
  analyzes: []
}

const analyzesSlice = createSlice({
  name: 'analyzes',
  initialState,
  reducers: {
    setAnalyzes(state, action: PayloadAction<Analysis[]>) {
      state.analyzes = action.payload
    },
    createAnalysis(state, action: PayloadAction<Analysis>) {
      state.analyzes = [...state.analyzes, action.payload]
    },
    updateAnalysis(state, action: PayloadAction<Analysis>) {
      state.analyzes = state.analyzes.map(analysis => analysis.id === action.payload.id ? action.payload : analysis)
    },
    removeAnalysis(state, action: PayloadAction<number>) {
      state.analyzes = state.analyzes.filter(analysis => analysis.id !== action.payload)
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export const {
  setAnalyzes,
  createAnalysis,
  updateAnalysis,
  removeAnalysis,
  setLoading
} = analyzesSlice.actions

export default analyzesSlice.reducer