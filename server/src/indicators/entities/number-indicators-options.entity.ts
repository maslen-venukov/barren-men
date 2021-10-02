import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm'
import { Indicator } from './indicator.entity'

@Entity('number_indicators_options')
export class NumberIndicatorsOptions {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'float' })
  min: number

  @Column({ type: 'float' })
  minNorm: number

  @Column({ type: 'float' })
  maxNorm: number

  @Column({ type: 'float' })
  max: number

  @Column()
  units: string

  @OneToOne(() => Indicator, indicator => indicator.numberOptions, { onDelete: 'CASCADE' })
  indicator: Indicator
}