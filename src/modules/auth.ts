import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import UserModule from '@modules/user';
import { AuthService } from '@services/auth';
import { secretKey } from '@environments/auth';

import { JwtStrategy } from './strategies/jwt';
import { AuthResolver } from '@resolvers/auth';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService],
})
export default class AuthModule {}
