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

import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth';
import { RoleGuard } from 'src/guards/role';

import { PubSub } from 'graphql-subscriptions';

@Resolver(() => RegisteredTime)
export class RegisterResolver {
  constructor(
    @Inject(RegisterService) private registerService: RegisterService,
    @Inject(UserService) private userService: UserService,
    private readonly pubSub: PubSub,
  ) {}

  @UseGuards(RoleGuard)
  @Query(() => [RegisteredTime])
  async listRegisters() {
    return await this.registerService.listRegisters();
  }

  @UseGuards(AuthGuard)
  @Query(() => [RegisteredTime])
  async listUserRegisters(@Context() context) {
    const userId = context.req.user.id;

    return await this.registerService.listUserRegisters(userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RegisteredTime)
  async createRegister(
    @Args('timeRegistered') timeRegistered: Date,
    @Args('type') type: 'in' | 'out',
    @Context() context,
  ): Promise<RegisteredTime> {
    const userId = context.req.user.id;

    const newRegister = await this.registerService.createRegister({
      timeRegistered,
      type,
      userId,
    });

    this.pubSub.publish('registerAdded', {
      registerAdded: newRegister,
    });

    return newRegister;
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
