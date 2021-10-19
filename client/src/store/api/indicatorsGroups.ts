import { Dispatch } from 'redux'
import api from 'core/api'
import { setIndicatorsGroups, setLoading } from '../slices/indicatorsGroups'
import catchError from 'utils/catchError'
import { IndicatorsGroup } from '../types/indicatorsGroups'

export const fetchIndicatorsGroups = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.get<{
    indicatorsGroups: IndicatorsGroup[]
  }>('/indicators-groups')
    .then(({ data }) => dispatch(setIndicatorsGroups(data.indicatorsGroups)))
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}