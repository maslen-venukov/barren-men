import { PipeTransform, Injectable } from '@nestjs/common';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';

type ParseDatePipeBody = CreatePatientDto & {
  birthDate: string
  infertilityDate: string
}

@Injectable()
export class ParseDatePipe implements PipeTransform<ParseDatePipeBody, CreatePatientDto> {
  transform(value: ParseDatePipeBody) {
    return {
      ...value,
      birthDate: new Date(value.birthDate),
      infertilityDate: new Date(value.infertilityDate)
    }
  }
}