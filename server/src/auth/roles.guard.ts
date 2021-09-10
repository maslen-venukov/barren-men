import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt';
import { Exception } from 'src/enums/exception.enum';
import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  canActivate(ctx: ExecutionContext) {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        ctx.getHandler(),
        ctx.getClass(),
      ])

      if(!requiredRoles) {
        return true
      }

      const req = ctx.switchToHttp().getRequest()
      const auth = req.headers.authorization

      const type = auth.split(' ')[0]
      const token = auth.split(' ')[1]

      if(type !== 'Bearer' || !token) {
        throw new UnauthorizedException(Exception.AuthorizationFailed)
      }

      const user = this.jwtService.verify(token)
      const permitted = requiredRoles.some(role => user.role === role)

      if(permitted) {
        return true
      }

      throw new ForbiddenException(Exception.NoAccess)
    } catch {
      throw new ForbiddenException(Exception.NoAccess)
    }
  }
}