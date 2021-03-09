import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class RegisterInput {
  @Field()
  timeRegistered: Date;

  @Field()
  userId: number;
}
