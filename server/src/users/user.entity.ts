import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Role } from 'src/enums/role.enum'
import { Token } from 'src/tokens/token.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({ unique: true })
  login: string

  @Column()
  @Index({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  lastName: string

  @Column()
  firstName: string

  @Column()
  patronymic: string

  @Column({ default: Role.Operator })
  role: string

  @OneToMany(() => Token, token => token.user)
  tokens: Token[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}