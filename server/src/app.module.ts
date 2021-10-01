import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailerModule } from '@nestjs-modules/mailer'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { TokensModule } from './tokens/tokens.module'
import { PatientsModule } from './patients/patients.module'
import { PatientsGroupsModule } from './patients-groups/patients-groups.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS
        }
      },
      defaults: {
        from: `Barren Men <${process.env.MAILER_USER}>`,
      }
    }),
    UsersModule,
    AuthModule,
    TokensModule,
    PatientsModule,
    PatientsGroupsModule
  ]
})
export class AppModule {}
