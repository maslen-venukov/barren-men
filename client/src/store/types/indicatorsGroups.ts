export interface IndicatorsGroup {
  id: number
  name: string
}

export interface IndicatorsGroupState {
  loading: boolean
  indicatorsGroups: IndicatorsGroup[]
}