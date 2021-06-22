import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: any, context: ExecutionContext): any => {
    const req = context.switchToHttp().getRequest();
    const { user } = req;

    if (!user) {
      return null;
    }

    return data ? user[data] : req.user;
  },
);
