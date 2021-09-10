import axios, { AxiosError, AxiosRequestConfig } from 'axios'

type ResponseError = AxiosError & { config: AxiosRequestConfig & { _retry: boolean }}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

instance.interceptors.request.use(config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

instance.interceptors.response.use(config => {
  return config
}, async (err: ResponseError) => {
  const originalRequest = err.config
  if(err.response?.status === 401 && err.config && !err.config._retry) {
    err.config._retry = true
    try {
      const res = await axios.get<{
        accessToken: string
      }>(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
        withCredentials: true
      })
      localStorage.setItem('accessToken', res.data.accessToken)
      return instance.request(originalRequest)
    } catch {}
  }
  throw err
})

export default instance