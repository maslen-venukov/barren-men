import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { TokensModule } from 'src/tokens/tokens.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET
    }),
    forwardRef(() => UsersModule),
    TokensModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
