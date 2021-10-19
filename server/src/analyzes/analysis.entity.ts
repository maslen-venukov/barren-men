import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { Patient } from 'src/patients/patient.entity'
import { AnalysisIndicator } from 'src/analysis-indicators/analysis-indicator.entity'

@Entity('analyzes')
export class Analysis {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamptz' })
  date: Date

  @Column()
  stage: number

  @Column({ select: false })
  patientId: number

  @ManyToOne(() => Patient, patient => patient.analyzes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient: Patient

  @OneToMany(() => AnalysisIndicator, indicator => indicator.analysis)
  indicators: AnalysisIndicator[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}