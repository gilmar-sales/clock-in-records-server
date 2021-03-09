import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, HideField, ObjectType } from '@nestjs/graphql';

import EncryptTransformer from './transformers/encrypt';
import { RegisteredTime } from './registered-time';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @HideField()
  @Column({ transformer: EncryptTransformer })
  password: string;

  @Field()
  @Column({ default: 'collaborator' })
  role: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RegisteredTime, (register) => register.userConnection)
  registerConnection: Promise<RegisteredTime[]>;
}
