import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@entities/user';
import { UserResolver } from '@resolvers/user';
import { UserService } from '@services/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
})
export default class UserModule {}
