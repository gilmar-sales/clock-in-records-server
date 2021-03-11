import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisteredTime } from '@entities/registered-time';
import RegisterInput from '@inputs/register';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(RegisteredTime)
    private readonly repository: Repository<RegisteredTime>,
  ) {}

  public async listRegisters() {
    const registers = await this.repository.find({ order: { id: 'DESC' } });

    return registers;
  }

  public async listUserRegisters(userId: number) {
    const registers = await this.repository.find({
      where: { userId },
      order: { id: 'DESC' },
    });

    return registers;
  }

  async createRegister(data: RegisterInput) {
    const register = await this.repository.create(data);

    return this.repository.save(register);
  }
}
