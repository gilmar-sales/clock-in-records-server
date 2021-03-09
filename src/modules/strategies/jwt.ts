import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { secretKey } from '@environments/auth';
import { UserService } from '@services/user';
import { User } from '@entities/user';

export interface TokenPayload {
  user: User;
  token: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private userService: UserService;

  constructor(userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
      signOptions: {
        expiresIn: '1d',
      },
    });
    this.userService = userService;
  }

  async validate(payload: TokenPayload): Promise<User> {
    const {
      user: { id },
    } = payload;

    const user = await this.userService.findById(id);

    if (!user) {
      return null;
    }

    return user;
  }
}
