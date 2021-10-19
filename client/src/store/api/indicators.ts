import { Dispatch } from 'redux'
import api from 'core/api'
import { setIndicators, setLoading } from '../slices/indicators'
import catchError from 'utils/catchError'
import { Indicator } from '../types/indicators'

export const fetchIndicators = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.get<{
    indicators: Indicator[]
  }>('/indicators')
    .then(({ data }) => dispatch(setIndicators(data.indicators)))
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}