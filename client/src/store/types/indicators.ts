export type IndicatorsType = 'number' | 'text' | 'boolean'

export enum IndicatorsTypeEnum {
  Number = 'number',
  Text = 'text',
  Boolean = 'boolean'
}

export interface NumberOptions {
  id: number
  min: number
  minNorm: number
  maxNorm: number
  max: number
  units: string
}

export interface TextOptions {
  id: number
  norm: string
}

export interface BooleanOptions {
  id: number
  norm: boolean
}

export interface Indicator {
  id: number
  name: string
  type: IndicatorsType
  groupId: number
  numberOptions?: NumberOptions
  textOptions?: TextOptions
  booleanOptions?: BooleanOptions
}

export interface IndicatorsState {
  loading: boolean
  indicators: Indicator[]
}
