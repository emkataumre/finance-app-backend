import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('RolesGuard. user:', user);
    console.log('RolesGuard. requiredRoles:', requiredRoles);

    if (!user) {
      console.log('RolesGuard. User is undefined');
      return false;
    }

    if (!user.role) {
      console.log('RolesGuard. User role is undefined');
      return false;
    }
    const result = requiredRoles.includes(user.role);
    console.log('RolesGuard. result:', result);
    return result;
  }
}
