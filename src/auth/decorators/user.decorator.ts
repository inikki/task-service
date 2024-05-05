import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth0JwtPayload } from '../guards/types/interface';

export const GetUserId = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const claim: Auth0JwtPayload = request.auth;
    return claim.sub;
  },
);
