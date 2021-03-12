import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { RegisterService } from '@services/register';
import { RegisteredTime } from '@entities/registered-time';

describe('RegisterService', () => {
  let registerService: RegisterService;

  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockData = {
    userId: 1,
    timeRegistered: new Date(),
    type: 'in',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        {
          provide: getRepositoryToken(RegisteredTime),
          useFactory: () => repositoryMock,
        },
      ],
    }).compile();

    registerService = module.get<RegisterService>(RegisterService);
  });

  beforeEach(() => {
    repositoryMock.create.mockReset();
    repositoryMock.save.mockReset();
    repositoryMock.findOne.mockReset();
    repositoryMock.find.mockReset();
  });

  it('should be defined', () => {
    expect(registerService).toBeDefined();
  });

  describe('listing registers', () => {
    it('should find all the registers of a user by their id', async () => {
      repositoryMock.find.mockReturnValue([mockData, mockData]);

      const userId = 1;
      const registers = await registerService.listUserRegisters(userId);

      expect(registers).toHaveLength(2);
      expect(repositoryMock.find).toBeCalledWith({
        order: { id: 'DESC' },
        where: { userId },
      });
      expect(repositoryMock.find).toBeCalledTimes(1);
    });

    it('should find all registers', async () => {
      repositoryMock.find.mockReturnValue([mockData, mockData, mockData]);

      const registers = await registerService.listRegisters();

      expect(registers).toHaveLength(3);
      expect(repositoryMock.find).toBeCalledTimes(1);
    });
  });
});
