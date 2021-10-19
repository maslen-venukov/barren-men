import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany
} from 'typeorm'
import { IndicatorsGroup } from 'src/indicators-groups/indicators-group.entity'
import { IndicatorsType as IndicatorsTypeEnum } from 'src/enums/indicators-type.enum'
import { IndicatorsType } from 'src/types/indicatores-type.type'
import { NumberIndicatorsOptions } from './number-indicators-options.entity'
import { TextIndicatorsOptions } from './text-indicators-options.entity'
import { BooleanIndicatorsOptions } from './boolean-indicators-options.entity'
import { AnalysisIndicator } from 'src/analysis-indicators/analysis-indicator.entity'

@Entity('indicators')
export class Indicator {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ enum: IndicatorsTypeEnum })
  type: IndicatorsType

  @OneToOne(() => NumberIndicatorsOptions, options => options.indicator, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  numberOptions?: NumberIndicatorsOptions

  @OneToOne(() => TextIndicatorsOptions, options => options.indicator, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  textOptions?: TextIndicatorsOptions

  @OneToOne(() => BooleanIndicatorsOptions, options => options.indicator, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  booleanOptions?: BooleanIndicatorsOptions

  @Column()
  groupId: number

  @ManyToOne(() => IndicatorsGroup, group => group.indicators, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: IndicatorsGroup

  @OneToMany(() => Indicator, indicator => indicator.analysisIndicators)
  analysisIndicators: AnalysisIndicator[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}