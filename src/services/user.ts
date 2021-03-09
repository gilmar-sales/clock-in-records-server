import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@entities/user';
import { Repository } from 'typeorm';
import UserInput from '@inputs/user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async createUser(data: UserInput): Promise<User> {
    const getUserByEmail = await this.findByEmail(data.email);

    if (getUserByEmail)
      throw new BadRequestException('E-mail is already being used');

    const user = this.repository.create(data);

    return this.repository.save(user);
  }

  async deleteUser(data: number): Promise<boolean> {
    const user = await this.repository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: data })
      .execute();

    return Boolean(user.affected);
  }

  async listUsers(): Promise<User[]> {
    return await this.repository.find();
  }

  async findByEmail(data: string): Promise<User> {
    return await this.repository.findOne({ email: data });
  }
  async findById(data: number): Promise<User> {
    return await this.repository.findOne({ id: data });
  }
}
