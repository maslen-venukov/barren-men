import { Dispatch } from 'redux'
import { message } from 'antd'
import api from 'core/api'
import { setAnalyzes, createAnalysis, removeAnalysis, setLoading, updateAnalysis } from 'store/slices/analyzes'
import catchError from 'utils/catchError'
import { Analysis, CreateAnalysis, UpdateAnalysis } from 'store/types/analyzes'

export const fetchAnalyzes = (patientId: number) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api.get<{
    analyzes: Analysis[]
  }>('/analyzes', {
    params: {
      patientId
    }
  })
    .then(({ data }) => dispatch(setAnalyzes(data.analyzes)))
    .catch(catchError)
    .finally(() => dispatch(setLoading(false)))
}

export const postAnalysis = (data: CreateAnalysis) => (dispatch: Dispatch) => (
  new Promise<Analysis>(resolve => {
    api.post<{
      message: string,
      analysis: Analysis
    }>('/analyzes', data)
      .then(({ data }) => {
        dispatch(createAnalysis(data.analysis))
        message.success(data.message)
        resolve(data.analysis)
      })
      .catch(catchError)
  })
)

export const patchAnalysis = (id: number, data: UpdateAnalysis) => (dispatch: Dispatch) => (
  new Promise<Analysis>(resolve => {
    api.patch<{
      message: string,
      analysis: Analysis
    }>(`/analyzes/${id}`, data)
      .then(({ data }) => {
        dispatch(updateAnalysis(data.analysis))
        message.success(data.message)
        resolve(data.analysis)
      })
      .catch(catchError)
  })
)

export const deleteAnalysis = (id: number) => (dispatch: Dispatch) => {
  api.delete<{
    message: string
  }>(`/analyzes/${id}`)
    .then(({ data }) => {
      dispatch(removeAnalysis(id))
      message.success(data.message)
    })
    .catch(catchError)
}