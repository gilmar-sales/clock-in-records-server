import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as typeOrmOptions from '@config/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
