import { Dispatch } from 'redux'
import { message } from 'antd'
import api from 'core/api'
import { setUsers, setLoading, createUser, removeUser } from '../slices/users'
import catchError from 'utils/catchError'
import { User } from '../types/users'

export const fetchUsers = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.get<{
    users: User[]
  }>('/users')
    .then(({ data }) => dispatch(setUsers(data.users)))
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const postUser = (
  user: Pick<User, 'email' | 'lastName' | 'firstName' | 'patronymic'>
) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.post<{
    message: string,
    user: User
  }>('/users', user)
    .then(({ data }) => {
      dispatch(createUser(data.user))
      message.success(data.message)
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const deleteUser = (id: number) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.delete<{
    message: string
  }>(`/users/${id}`)
    .then(({ data }) => {
      dispatch(removeUser(id))
      message.success(data.message)
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}