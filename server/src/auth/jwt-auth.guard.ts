import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Exception } from 'src/enums/exception.enum'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(ctx: ExecutionContext) {
    try {
      const req = ctx.switchToHttp().getRequest()
      const auth = req.headers.authorization

      const type = auth.split(' ')[0]
      const token = auth.split(' ')[1]

      if(type !== 'Bearer' || !token) {
        throw new UnauthorizedException(Exception.AuthorizationFailed)
      }

      const user = this.jwtService.verify(token)
      req.user = user

      return true
    } catch {
      throw new UnauthorizedException(Exception.AuthorizationFailed)
    }
  }
}
