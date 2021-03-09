import { User } from '@entities/user';

export interface TokenPayload {
  user: User;
}
