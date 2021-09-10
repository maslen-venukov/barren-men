import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { User } from 'src/users/user.entity'

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: string

  @ManyToOne(() => User, user => user.tokens, { onDelete: 'CASCADE' })
  user: User

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}