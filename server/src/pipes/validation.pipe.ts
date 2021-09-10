import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if(errors.length) {
      const message = Object.values(errors[0].constraints)[0]
      throw new BadRequestException(message)
    }

    return value
  }
}