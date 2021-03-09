import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { AuthService } from '@services/auth';
import { AuthInput } from '@inputs/auth';
import { User } from '@entities/user';

@ObjectType()
class TokenPayload {
  @Field()
  user: User;

  @Field()
  token: string;
}

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => TokenPayload)
  async login(@Args('data') data: AuthInput): Promise<TokenPayload> {
    const response = await this.authService.validateUser(
      data.email,
      data.password,
    );

    return {
      user: response.user,
      token: response.token,
    };
  }
}
