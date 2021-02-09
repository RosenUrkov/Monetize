import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from '../../dto/auth/create-user.dto';
import { ShowUserDTO } from '../../dto/auth/show-user.dto';
import { User } from '../../entities/user.entity';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

describe('Auth Service Tests', () => {
  let sut: AuthService;

  let userService: any;
  let jwtService: any;
  let configService: any;

  beforeEach(async () => {
    userService = {
      createUser() {
        /* empty */
      },
      validateUserPassword() {
        /* empty */
      },
      findUserByUsername() {
        /* empty */
      },
    };

    jwtService = {
      signAsync() {
        /* empty */
      },
    };

    configService = {
      get() {
        /* empty */
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    sut = module.get<AuthService>(AuthService);
  });

  it('Sanity check', () => {
    expect(sut).toBeDefined();
  });

  describe('register()', () => {
    it('should call usersRepo.createUser() once with correct user data', async () => {
      // arrange
      const fakeUser = new CreateUserDTO();
      const resultUser = new ShowUserDTO();

      const spy = jest
        .spyOn(userService, 'createUser')
        .mockReturnValue(Promise.resolve(resultUser));

      // act
      const result = await sut.register(fakeUser);

      // assert
      expect(spy).toBeCalledWith(fakeUser);
      expect(spy).toBeCalledTimes(1);
    });

    it('should return the result from userRepo.createUser()', async () => {
      // arrange
      const fakeUser = new CreateUserDTO();
      const resultUser = new ShowUserDTO();

      const spy = jest
        .spyOn(userService, 'createUser')
        .mockReturnValue(Promise.resolve(resultUser));

      // act
      const result = await sut.register(fakeUser);

      // assert
      expect(result).toEqual(resultUser);
    });
  });

  describe('login()', () => {
    it('should call usersRepo.findUserByUsername() once with correct username', async () => {
      // arrange
      const fakeUser = new CreateUserDTO();
      fakeUser.username = 'username';

      const resultUser = new ShowUserDTO();
      resultUser.id = 15;

      const findUserByUsernameSpy = jest
        .spyOn(userService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(resultUser));

      const validateUserPasswordSpy = jest
        .spyOn(userService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve('token'));

      const getSpy = jest.spyOn(configService, 'get').mockReturnValue(3600);

      // act
      const result = await sut.login(fakeUser);

      // assert
      expect(findUserByUsernameSpy).toBeCalledWith(fakeUser.username);
      expect(findUserByUsernameSpy).toBeCalledTimes(1);
    });

    it('should throw if userRepo.findUserByUsername() does not return a correct user', async () => {
      // arrange
      const fakeUser = new CreateUserDTO();
      fakeUser.username = 'username';

      const resultUser = new ShowUserDTO();
      resultUser.id = 15;

      const findUserByUsernameSpy = jest
        .spyOn(userService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(null));

      const validateUserPasswordSpy = jest
        .spyOn(userService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve('token'));

      const getSpy = jest.spyOn(configService, 'get').mockReturnValue(3600);

      // act assert
      expect(() => sut.login(fakeUser)).rejects.toThrowError();
    });

    it('should call usersRepo.validateUserPassword() once with correct user', async () => {
      // arrange
      const fakeUser = new CreateUserDTO();
      fakeUser.username = 'username';

      const resultUser = new ShowUserDTO();
      resultUser.id = 15;

      const findUserByUsernameSpy = jest
        .spyOn(userService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(resultUser));

      const validateUserPasswordSpy = jest
        .spyOn(userService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve('token'));

      const getSpy = jest.spyOn(configService, 'get').mockReturnValue(3600);

      // act
      const result = await sut.login(fakeUser);

      // assert
      expect(validateUserPasswordSpy).toBeCalledWith(fakeUser);
      expect(validateUserPasswordSpy).toBeCalledTimes(1);
    });

    it('should throw if userRepo.validateUserPassword() returns false', async () => {
      // arrange
      const fakeUser = new CreateUserDTO();
      fakeUser.username = 'username';

      const resultUser = new ShowUserDTO();
      resultUser.id = 15;

      const findUserByUsernameSpy = jest
        .spyOn(userService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(resultUser));

      const validateUserPasswordSpy = jest
        .spyOn(userService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(false));

      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve('token'));

      const getSpy = jest.spyOn(configService, 'get').mockReturnValue(3600);

      // act assert
      expect(() => sut.login(fakeUser)).rejects.toThrowError();
    });

    it('should call jwtService.signAsync() once with correct user payload', async () => {
      // arrange
      const fakeUser = new CreateUserDTO();
      fakeUser.username = 'username';

      const resultUser = new ShowUserDTO();
      resultUser.id = 15;

      const findUserByUsernameSpy = jest
        .spyOn(userService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(resultUser));

      const validateUserPasswordSpy = jest
        .spyOn(userService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve('token'));

      const getSpy = jest.spyOn(configService, 'get').mockReturnValue(3600);

      // act
      const result = await sut.login(fakeUser);

      // assert
      expect(signAsyncSpy).toBeCalledWith(resultUser);
      expect(signAsyncSpy).toBeCalledTimes(1);
    });

    it('should call configService.get() once with correct key', async () => {
      // arrange
      const fakeUser = new CreateUserDTO();
      fakeUser.username = 'username';

      const resultUser = new ShowUserDTO();
      resultUser.id = 15;

      const findUserByUsernameSpy = jest
        .spyOn(userService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(resultUser));

      const validateUserPasswordSpy = jest
        .spyOn(userService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve('token'));

      const getSpy = jest.spyOn(configService, 'get').mockReturnValue(3600);

      // act
      const result = await sut.login(fakeUser);

      // assert
      expect(getSpy).toBeCalledWith('JWT_EXPIRE_TIME');
      expect(getSpy).toBeCalledTimes(1);
    });

    it('should return correct result', async () => {
      // arrange
      const fakeUser = new CreateUserDTO();
      fakeUser.username = 'username';

      const resultUser = new ShowUserDTO();
      resultUser.id = 15;

      const findUserByUsernameSpy = jest
        .spyOn(userService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(resultUser));

      const validateUserPasswordSpy = jest
        .spyOn(userService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve('token'));

      const getSpy = jest.spyOn(configService, 'get').mockReturnValue(3600);

      // act
      const result = await sut.login(fakeUser);

      // assert
      expect(result).toEqual({
        id: resultUser.id,
        token: 'token',
        expiresIn: 3600,
      });
    });
  });
});
