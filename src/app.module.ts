import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as typeOrmOptions from '@config/typeorm';
import graphqlOptions from '@config/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    GraphQLModule.forRoot(graphqlOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
