import { AxiosError } from 'axios'
import { message } from 'antd'

const catchError = (e: AxiosError<{ message: string }>) => {
  message.error(e.response?.data.message || 'Что-то пошло не так')
}

export default catchError