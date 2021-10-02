import { Dispatch } from 'redux'
import api from 'core/api'
import {
  setIndicators,
  setLoading
} from '../slices/indicators'
import catchError from 'utils/catchError'
import { IndicatorsGroup } from '../types/indicators'

export const fetchIndicators = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.get<{
    indicators: IndicatorsGroup[]
  }>('/indicators')
    .then(({ data }) => dispatch(setIndicators(data.indicators)))
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}