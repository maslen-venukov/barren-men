import { Dispatch } from 'redux'
import { message } from 'antd'
import api from 'core/api'
import {
  setPatients,
  createPatient,
  updatePatient,
  removePatient,
  setLoading
} from '../slices/patients'
import catchError from 'utils/catchError'
import { Patient, PatientsGroupWithPatients, CreatePatient, UpdatePatient } from '../types/patients'

export const fetchPatients = () => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.get<{
    patients: PatientsGroupWithPatients[]
  }>('/patients')
    .then(({ data }) => dispatch(setPatients(data.patients)))
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const postPatient = (data: CreatePatient) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.post<{
    patient: Patient,
    groupId: number,
    message: string
  }>('/patients', data)
    .then(({ data }) => {
      const { patient, groupId } = data
      dispatch(createPatient({ patient, groupId }))
      message.success(data.message)
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const patchPatient = (id: number, data: UpdatePatient) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.patch<{
    patient: Patient,
    message: string
  }>(`/patients/${id}`, data)
    .then(({ data }) => {
      dispatch(updatePatient(data.patient))
      message.success(data.message)
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const deletePatient = (id: number) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.delete<{
    message: string
  }>(`/patients/${id}`)
    .then(({ data }) => {
      dispatch(removePatient(id))
      message.success(data.message)
    })
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}