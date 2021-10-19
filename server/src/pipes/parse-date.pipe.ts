import { PipeTransform, Injectable } from '@nestjs/common'

type ParseDatePipeBody = Record<string, any> & {
  birthDate?: string
  infertilityDate?: string
  date?: string
}

type ParseDatePipeResult = Record<string, any> & {
  birthDate?: Date
  infertilityDate?: Date
  date?: Date
}

@Injectable()
export class ParseDatePipe implements PipeTransform<ParseDatePipeBody, ParseDatePipeResult> {
  transform(value: ParseDatePipeBody) {
    const keys = ['birthDate', 'infertilityDate', 'date']
    return Object.entries(value).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: keys.includes(key) ? new Date(value) : value
    }), {})
  }
}