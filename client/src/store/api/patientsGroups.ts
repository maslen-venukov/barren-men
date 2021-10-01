import { Dispatch } from 'redux'
import { message } from 'antd'
import api from 'core/api'
import {
  setPatientsGroups,
  createPatientsGroup,
  updatePatientsGroup,
  removePatientsGroup,
  setLoading
} from '../slices/patientsGroups'
import catchError from 'utils/catchError'
import { PatientsGroup, CreatePatientsGroup, UpdatePatientsGroup } from '../types/patientsGroups'

export const fetchPatientsGroups = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.get<{
    patientsGroups: PatientsGroup[]
  }>('/patients-groups')
    .then(({ data }) => dispatch(setPatientsGroups(data.patientsGroups)))
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const postPatientsGroup = (data: CreatePatientsGroup) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.post<{
    patientsGroup: PatientsGroup,
    message: string
  }>('/patients-groups', data)
    .then(({ data }) => {
      dispatch(createPatientsGroup(data.patientsGroup))
      message.success(data.message)
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const patchPatientsGroup = (id: number, data: UpdatePatientsGroup) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.patch<{
    patientsGroup: PatientsGroup,
    message: string
  }>(`/patients-groups/${id}`, data)
    .then(({ data }) => {
      dispatch(updatePatientsGroup(data.patientsGroup))
      message.success(data.message)
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const deletePatientsGroup = (id: number) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.delete<{
    message: string
  }>(`/patients-groups/${id}`)
    .then(({ data }) => {
      dispatch(removePatientsGroup(id))
      message.success(data.message)
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}