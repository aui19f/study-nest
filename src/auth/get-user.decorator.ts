import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    console.log('======\n', ctx.switchToHttp().getRequest().user);
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
