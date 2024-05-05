import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Config } from 'config/interface';
import { UnauthorizedError, expressjwt as jwt } from 'express-jwt';
import { InvalidTokenError } from 'express-oauth2-jwt-bearer';
import { GetVerificationKey, expressJwtSecret } from 'jwks-rsa';
import { Scopes } from 'src/modules/tasks/helpers/scope.helper';
import { promisify } from 'util';
import { Auth0JwtPayload } from './types/interface';
import { UserService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private domain: string;
  private audience: string;

  constructor(
    private readonly config: ConfigService<Config, true>,
    private readonly userService: UserService,

    private reflector: Reflector,
  ) {
    this.domain = this.config.get('auth0.domain', { infer: true });
    this.audience = this.config.get('auth0.audience', { infer: true });
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const jwtCheck = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.domain}.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: this.audience,
        issuer: this.domain,
        algorithms: ['RS256'],
      }),
    );

    try {
      await jwtCheck(request, response);

      const claims: Auth0JwtPayload = request.auth;
      const { scope, sub: userId } = claims;

      if (userId) {
        // save user id to db
        await this.userService.create(userId);
      }

      if (!scope) {
        throw new ForbiddenException('No scopes defined');
      }

      // Get required scopes for endpoint
      const requiredScopes = this.reflector.get(Scopes, context.getHandler());

      // Get token scope
      const tokenScopes = scope.split(' ');

      const hasRequiredScopes = requiredScopes.every((scope: string) =>
        tokenScopes.includes(scope),
      );

      if (!hasRequiredScopes) {
        throw new ForbiddenException('Insufficient permissions');
      }

      return true;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw new UnauthorizedException('Bad credentials');
      }

      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException('Requires authentication');
      }

      throw error;
    }
  }
}
