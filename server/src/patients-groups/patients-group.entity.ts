import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Patient } from 'src/patients/patient.entity'

@Entity('patients_groups')
export class PatientsGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({ unique: true })
  number: number

  @Column()
  description: string

  @OneToMany(() => Patient, patient => patient.group)
  patients: Patient[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}