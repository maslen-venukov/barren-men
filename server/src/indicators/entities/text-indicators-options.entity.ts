import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm'
import { Indicator } from './indicator.entity'

@Entity('text_indicators_options')
export class TextIndicatorsOptions {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  norm: string

  @OneToOne(() => Indicator, indicator => indicator.textOptions, { onDelete: 'CASCADE' })
  indicator: Indicator
}