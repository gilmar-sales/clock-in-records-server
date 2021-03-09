import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user';

@ObjectType()
@Entity()
export class RegisteredTime {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  timeRegistered: Date;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.registerConnection)
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>;
}
