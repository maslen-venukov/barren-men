import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { PatientsGroup } from 'src/patients-groups/patients-group.entity'
import { Analysis } from 'src/analyzes/analysis.entity'

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  lastName: string

  @Column()
  firstName: string

  @Column()
  patronymic: string

  @Column({ type: 'timestamptz' })
  birthDate: Date

  @Column({ type: 'timestamptz' })
  infertilityDate: Date

  @Column({ select: false })
  groupId: number

  @ManyToOne(() => PatientsGroup, group => group.patients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: PatientsGroup

  @OneToMany(() => Analysis, analysis => analysis.patient)
  analyzes: Analysis[]

  @Column()
  phone: string

  @Column()
  address: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}