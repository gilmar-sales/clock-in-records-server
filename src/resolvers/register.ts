import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { RegisteredTime } from '@entities/registered-time';
import { User } from '@entities/user';

import { RegisterService } from '@services/register';
import RegisterInput from '@inputs/register';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth';
import { UserService } from '@services/user';

@Resolver(() => RegisteredTime)
export class RegisterResolver {
  constructor(
    @Inject(RegisterService) private registerService: RegisterService,
    @Inject(UserService) private userService: UserService,
  ) {}

  @Query(() => [RegisteredTime])
  @UseGuards(AuthGuard)
  async listUserRegisters(@Context() context) {
    const userId = context.req.user.id;

    return await this.registerService.listUserRegisters(userId);
  }

  @Mutation(() => RegisteredTime)
  async createRegister(
    @Args('data') data: RegisterInput,
  ): Promise<RegisteredTime> {
    return await this.registerService.createRegister(data);
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() parent: RegisteredTime): Promise<User> {
    return await this.userService.findById(parent.userId);
  }
}
