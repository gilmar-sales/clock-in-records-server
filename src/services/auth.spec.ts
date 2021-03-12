import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcrypt';

import { AuthService } from '@services/auth';
import { UserService } from '@services/user';
import { UnauthorizedException } from '@nestjs/common';

describe('RegisterService', () => {
  let authService: AuthService;

  const userServiceMock = {
    findByEmail: jest.fn(),
  };

  const jwtServiceMock = {
    signAsync: jest.fn(),
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
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    userServiceMock.findByEmail.mockReset();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('when validate user', () => {
    it('should validate user', async () => {
      const password = hashSync(mockData.password, 10);
      userServiceMock.findByEmail.mockReturnValue({
        ...mockData,
        password,
      });
      jwtServiceMock.signAsync.mockReturnValue('valid_token');

      const result = await authService.validateUser(
        mockData.email,
        mockData.password,
      );

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(userServiceMock.findByEmail).toBeCalledTimes(1);
    });

    it('should throw if user password is invalid', async () => {
      userServiceMock.findByEmail.mockReturnValue(mockData);

      expect(
        authService.validateUser(mockData.email, 'wrong password'),
      ).rejects.toThrow(UnauthorizedException);
      expect(userServiceMock.findByEmail).toBeCalledTimes(1);
    });
  });
});
