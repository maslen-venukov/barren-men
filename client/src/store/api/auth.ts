import { Dispatch } from 'redux'
import axios from 'axios'
import api from 'core/api'
import { setAuth, setReady, setLoading, setUser } from '../slices/auth'
import catchError from 'utils/catchError'
import { AuthUser } from '../types/auth'

export const login = (loginOrEmail: string, password: string) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.post<{
    accessToken: string,
    user: AuthUser
  }>('/auth/login', { loginOrEmail, password })
    .then(({ data }) => {
      dispatch(setAuth(true))
      dispatch(setUser(data.user))
      localStorage.setItem('accessToken', data.accessToken)
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const checkAuth = () => (dispatch: Dispatch) => {
  axios.get<{
    accessToken: string,
    user: AuthUser
  }>(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
    withCredentials: true
  })
    .then(({ data }) => {
      dispatch(setAuth(true))
      dispatch(setUser(data.user))
      localStorage.setItem('accessToken', data.accessToken)
    })
    .finally(() => dispatch(setReady(true)))
}

export const logout = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.post('/auth/logout')
    .then(() => {
      dispatch(setAuth(false))
      dispatch(setUser(null))
      localStorage.removeItem('accessToken')
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}