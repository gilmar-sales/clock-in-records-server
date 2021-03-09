import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { UserService } from '@services/user';
import { User } from '@entities/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('E-mail not registered');

    if (compareSync(password, user.password)) {
      delete user.password;
      return this.login(user);
    } else throw new BadRequestException('Incorrect password');
  }

  async login(user: User) {
    const payload = { user };
    return {
      user: user,
      token: this.jwtService.signAsync(payload),
    };
  }
}
