import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegisterResolver } from '@resolvers/register';
import { RegisterService } from '@services/register';
import { UserService } from '@services/user';

import { RegisteredTime } from '@entities/registered-time';
import { User } from '@entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([RegisteredTime, User])],
  providers: [RegisterResolver, RegisterService, UserService],
  exports: [RegisterService],
})
export default class UserModule {}
