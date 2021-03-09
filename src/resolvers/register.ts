import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';

import { RegisteredTime } from '@entities/registered-time';
import { User } from '@entities/user';

import { RegisterService } from '@services/register';
import { UserService } from '@services/user';

import RegisterInput from '@inputs/register';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth';

import { PubSub } from 'graphql-subscriptions';

@Resolver(() => RegisteredTime)
export class RegisterResolver {
  constructor(
    @Inject(RegisterService) private registerService: RegisterService,
    @Inject(UserService) private userService: UserService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [RegisteredTime])
  async listRegisters() {
    return await this.registerService.listRegisters();
  }

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
    const newRegister = await this.registerService.createRegister(data);

    this.pubSub.publish('registerAdded', {
      registerAdded: newRegister,
    });

    return await this.registerService.createRegister(data);
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() parent: RegisteredTime): Promise<User> {
    return await this.userService.findById(parent.userId);
  }

  @Subscription(() => RegisteredTime, {
    name: 'registerAdded',
  })
  async registerAddHandler() {
    return this.pubSub.asyncIterator('registerAdded');
  }
}
