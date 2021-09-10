import { Dispatch } from 'redux'
import api from 'core/api'
import { setUsers, setLoading } from '../slices/users'
import catchError from 'utils/catchError'
import { User } from '../types/users'

export const fetchUsers = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.get<User[]>('/users')
    .then(({ data }) => dispatch(setUsers(data)))
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}