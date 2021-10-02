import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm'
import { Indicator } from 'src/indicators/entities/indicator.entity'

@Entity('indicators_groups')
export class IndicatorsGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({ unique: true })
  name: string

  @OneToMany(() => Indicator, indicator => indicator.group)
  indicators: Indicator[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}