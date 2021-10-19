import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Indicator } from 'src/indicators/entities/indicator.entity'
import { Analysis } from 'src/analyzes/analysis.entity'

@Entity('analysis_indicators')
export class AnalysisIndicator {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: string

  @Column()
  indicatorId: number

  @ManyToOne(() => Indicator, indicator => indicator.analysisIndicators, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'indicatorId' })
  indicator: Indicator

  @Column({ select: false })
  analysisId: number

  @ManyToOne(() => Analysis, analysis => analysis.indicators, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'analysisId' })
  analysis: Analysis

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}