import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ScopeAuthGuard extends AuthGuard() {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const scopes = this.reflector.get<string[]>('scopes', context.getHandler());
    if (scopes) {
      const request = context.switchToHttp().getRequest();
      const requestScopes = request.user.scope.split(' ');
      if (requestScopes.length === 0) return false;
      return (
        requestScopes.filter((x: string) => !scopes.includes(x)).length === 0
      );
    }

    return super.canActivate(context);
  }
}
