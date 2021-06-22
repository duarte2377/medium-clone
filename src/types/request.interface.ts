import { Request } from 'express';
import { UserEntity } from '@app/user/user.entity';

export interface RequestInterface extends Request {
  user?: UserEntity;
}
