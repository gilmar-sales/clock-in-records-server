import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(error, user, info: Error) {
    if (error || info || !user) {
      throw error || info || new UnauthorizedException();
    }

    if (user.role !== 'administrator') throw new UnauthorizedException();

    return user;
  }
}
