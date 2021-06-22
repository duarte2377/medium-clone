import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestInterface } from '@app/types/request.interface';

export const User = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<RequestInterface>();
    const { user } = req;

    if (!user) {
      return null;
    }

    return data ? user[data] : req.user;
  },
);
