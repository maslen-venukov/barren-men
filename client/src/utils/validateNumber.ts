import { RuleObject } from 'antd/lib/form'
import { StoreValue } from 'antd/lib/form/interface'

const validateNumber = (min: number, max: number) => ({
  validator(_: RuleObject, value: StoreValue) {
    if(value === undefined || value === '') {
      return Promise.reject(new Error('Заполните поле!'))
    }

    if(Number.isNaN(Number(value))) {
      return Promise.reject(new Error('Значение должно быть числом!'))
    }

    if(Number(value) < Number(min)) {
      return Promise.reject(new Error(`Значение должно быть не меньше ${min}!`))
    }

    if(Number(value) > Number(max)) {
      return Promise.reject(new Error(`Значение должно быть не больше ${max}!`))
    }

    return Promise.resolve()
  }
})

export default validateNumber