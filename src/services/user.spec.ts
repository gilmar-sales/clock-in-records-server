import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserService } from '@services/user';
import { User } from '@entities/user';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;

  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockData = {
    name: 'user',
    email: 'user@register.control',
    password: '123456',
    role: 'collaborator',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: () => repositoryMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    repositoryMock.create.mockReset();
    repositoryMock.save.mockReset();
    repositoryMock.findOne.mockReset();
    repositoryMock.find.mockReset();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('creating user', () => {
    it('should create a collaborator', async () => {
      repositoryMock.create.mockReturnValue(mockData);
      repositoryMock.save.mockReturnValue({ ...mockData, id: 1 });

      const mockInput = { ...mockData, id: 1 };
      const user = await userService.createUser(mockInput);

      expect(user.id).toEqual(1);
      expect(user).toMatchObject(mockData);
    });

    it('should not create a user with duplicated email', async () => {
      repositoryMock.findOne.mockReturnValue(mockData);

      const mockInput = { ...mockData, id: 2 };

      expect(userService.createUser(mockInput)).rejects.toThrow(
        BadRequestException,
      );
      expect(repositoryMock.findOne).toBeCalledWith({ email: mockInput.email });
      expect(repositoryMock.findOne).toBeCalledTimes(1);
    });
  });

  describe('finding users', () => {
    it('should find an user by email', async () => {
      repositoryMock.findOne.mockReturnValue({ ...mockData, id: 1 });

      const user = await userService.findByEmail(mockData.email);

      expect(user.id).toEqual(1);
      expect(user).toMatchObject(mockData);
      expect(repositoryMock.findOne).toBeCalledWith({ email: mockData.email });
      expect(repositoryMock.findOne).toBeCalledTimes(1);
    });

    it('should find an user by id', async () => {
      repositoryMock.findOne.mockReturnValue({ ...mockData, id: 1 });
      const user = await userService.findById(1);

      expect(user).toMatchObject(mockData);
      expect(repositoryMock.findOne).toBeCalledTimes(1);
      expect(repositoryMock.findOne).toBeCalledWith({ id: 1 });
      expect(repositoryMock.findOne).toBeCalledTimes(1);
    });
  });
});
