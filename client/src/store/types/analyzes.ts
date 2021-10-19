export interface AnalysisIndicator {
  id: number
  indicatorId: number
  value: string
}

export interface Analysis {
  id: number
  date: Date
  stage: number
  patientId: number
  groupId: number
  indicators: AnalysisIndicator[]
}

export interface AnalyzesState {
  loading: boolean
  analyzes: Analysis[]
}

export interface CreateAnalysisIndicator extends Omit<AnalysisIndicator, 'id'> {}

export interface CreateAnalysis extends Omit<Analysis, 'id' | 'groupId' | 'indicators'> {
  indicators: CreateAnalysisIndicator[]
}

export interface UpdateAnalysis extends Partial<CreateAnalysis> {}