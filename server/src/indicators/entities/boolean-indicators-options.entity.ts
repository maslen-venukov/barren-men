import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm'
import { Indicator } from './indicator.entity'

@Entity('boolean_indicators_options')
export class BooleanIndicatorsOptions {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  norm: boolean

  @OneToOne(() => Indicator, indicator => indicator.booleanOptions, { onDelete: 'CASCADE' })
  indicator: Indicator
}