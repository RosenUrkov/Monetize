import { CreateUserDTO } from './../../dto/auth/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShowUserDTO } from '../../dto/auth/show-user.dto';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';
import * as bcryptMock from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('User Service Tests', () => {
  let service: UserService;

  let usersRepo: any;

  beforeEach(async () => {
    usersRepo = {
      findOne() {
        /* empty */
      },
      create() {
        /* empty */
      },
      save() {
        /* empty */
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: usersRepo },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Sanity check', () => {
    expect(service).toBeDefined();
  });

  describe('findUserByUsername()', () => {
    it('should call usersRepo.findOne() once with correct username', async () => {
      // arrange
      const username = 'username';
      const fakeUser = new User();

      const spy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(fakeUser));

      // act
      const result = await service.findUserByUsername(username);

      // assert
      expect(spy).toBeCalledWith({ username });
      expect(spy).toBeCalledTimes(1);
    });

    it('should return the user transformed to ShowUserDTO', async () => {
      // arrange
      const username = 'username';
      const fakeUser = new User();

      const spy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(fakeUser));

      // act
      const result = await service.findUserByUsername(username);

      // assert
      expect(result).toEqual(fakeUser);
      expect(result).toBeInstanceOf(ShowUserDTO);
    });
  });

  describe('validateUserPassword()', () => {
    it('should call usersRepo.findOne() once with correct username', async () => {
      // arrange
      const fakeAuthUser = new CreateUserDTO();
      fakeAuthUser.username = 'username';
      fakeAuthUser.password = 'password';

      const fakeUser = new User();
      fakeUser.password = 'another password';

      const spy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(fakeUser));

      bcryptMock.compare.mockImplementation(() => true);

      // act
      const result = await service.validateUserPassword(fakeAuthUser);

      // assert
      expect(spy).toBeCalledWith({ username: fakeAuthUser.username });
      expect(spy).toBeCalledTimes(1);

      bcryptMock.compare.mockRestore();
    });

    it('should call bcrypt.compare() once with correct passwords', async () => {
      // arrange
      const fakeAuthUser = new CreateUserDTO();
      fakeAuthUser.username = 'username';
      fakeAuthUser.password = 'password';

      const fakeUser = new User();
      fakeUser.password = 'another password';

      const spy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(fakeUser));

      bcryptMock.compare.mockImplementation(() => true);

      // act
      const result = await service.validateUserPassword(fakeAuthUser);

      // assert
      expect(bcryptMock.compare).toBeCalledWith(
        fakeAuthUser.password,
        fakeUser.password,
      );
      expect(bcryptMock.compare).toBeCalledTimes(1);

      bcryptMock.compare.mockRestore();
    });

    it('should return the result from bcrypt comparison', async () => {
      // arrange
      const fakeAuthUser = new CreateUserDTO();
      fakeAuthUser.username = 'username';
      fakeAuthUser.password = 'password';

      const fakeUser = new User();
      fakeUser.password = 'another password';

      const spy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(fakeUser));

      bcryptMock.compare.mockImplementation(() => true);

      // act
      const result = await service.validateUserPassword(fakeAuthUser);

      // assert
      expect(result).toEqual(true);

      bcryptMock.compare.mockRestore();
    });
  });

  describe('createUser()', () => {
    it('should call usersRepo.findOne() once with correct username', async () => {
      // arrange
      const fakeAuthUser = new CreateUserDTO();
      fakeAuthUser.username = 'username';
      fakeAuthUser.password = 'password';

      const createdUser = new User();
      const savedUser = new User();

      const findOneSpy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      const createSpy = jest
        .spyOn(usersRepo, 'create')
        .mockReturnValue(createdUser);

      const saveSpy = jest
        .spyOn(usersRepo, 'save')
        .mockReturnValue(Promise.resolve(savedUser));

      bcryptMock.hash.mockImplementation(() => 'hash password');

      // act
      const result = await service.createUser(fakeAuthUser);

      // assert
      expect(findOneSpy).toBeCalledWith({ username: fakeAuthUser.username });
      expect(findOneSpy).toBeCalledTimes(1);

      bcryptMock.hash.mockRestore();
    });

    it('should throw error if findOne returns a user', async () => {
      // arrange
      const fakeAuthUser = new CreateUserDTO();
      fakeAuthUser.username = 'username';
      fakeAuthUser.password = 'password';

      const createdUser = new User();
      const savedUser = new User();

      const findOneSpy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(new User()));

      const createSpy = jest
        .spyOn(usersRepo, 'create')
        .mockReturnValue(createdUser);

      const saveSpy = jest
        .spyOn(usersRepo, 'save')
        .mockReturnValue(Promise.resolve(savedUser));

      bcryptMock.hash.mockImplementation(() => 'hash password');

      // act assert
      expect(() => service.createUser(fakeAuthUser)).rejects.toThrowError();

      bcryptMock.hash.mockRestore();
    });

    it('should call usersRepo.create() once with correct user', async () => {
      // arrange
      const fakeAuthUser = new CreateUserDTO();
      fakeAuthUser.username = 'username';
      fakeAuthUser.password = 'password';

      const createdUser = new User();
      const savedUser = new User();

      const findOneSpy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      const createSpy = jest
        .spyOn(usersRepo, 'create')
        .mockReturnValue(createdUser);

      const saveSpy = jest
        .spyOn(usersRepo, 'save')
        .mockReturnValue(Promise.resolve(savedUser));

      bcryptMock.hash.mockImplementation(() => 'hash password');

      // act
      const result = await service.createUser(fakeAuthUser);

      // assert
      expect(createSpy).toBeCalledWith(fakeAuthUser);
      expect(createSpy).toBeCalledTimes(1);

      bcryptMock.hash.mockRestore();
    });

    it('should call bcrypt.hash() once with correct password and salt', async () => {
      // arrange
      const fakeAuthUser = new CreateUserDTO();
      fakeAuthUser.username = 'username';
      fakeAuthUser.password = 'password';

      const createdUser = new User();
      const savedUser = new User();

      const findOneSpy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      const createSpy = jest
        .spyOn(usersRepo, 'create')
        .mockReturnValue(createdUser);

      const saveSpy = jest
        .spyOn(usersRepo, 'save')
        .mockReturnValue(Promise.resolve(savedUser));

      bcryptMock.hash.mockImplementation(() => 'hash password');

      // act
      const result = await service.createUser(fakeAuthUser);

      // assert
      expect(bcryptMock.hash).toBeCalledWith(fakeAuthUser.password, 10);
      expect(bcryptMock.hash).toBeCalledTimes(1);

      bcryptMock.hash.mockRestore();
    });

    it('should call userRepo.save() once with correct entity', async () => {
      // arrange
      const fakeAuthUser = new CreateUserDTO();
      fakeAuthUser.username = 'username';
      fakeAuthUser.password = 'password';

      const createdUser = new User();
      const savedUser = new User();

      const findOneSpy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      const createSpy = jest
        .spyOn(usersRepo, 'create')
        .mockReturnValue(createdUser);

      const saveSpy = jest
        .spyOn(usersRepo, 'save')
        .mockReturnValue(Promise.resolve(savedUser));

      bcryptMock.hash.mockImplementation(() => 'hash password');

      // act
      const result = await service.createUser(fakeAuthUser);

      // assert
      expect(saveSpy).toBeCalledWith(createdUser);
      expect(bcryptMock.hash).toBeCalledTimes(1);

      bcryptMock.hash.mockRestore();
    });

    it('should return the created user transformed to ShowUserDTO', async () => {
      // arrange
      const fakeAuthUser = new CreateUserDTO();
      fakeAuthUser.username = 'username';
      fakeAuthUser.password = 'password';

      const createdUser = new User();
      const savedUser = new User();

      const findOneSpy = jest
        .spyOn(usersRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      const createSpy = jest
        .spyOn(usersRepo, 'create')
        .mockReturnValue(createdUser);

      const saveSpy = jest
        .spyOn(usersRepo, 'save')
        .mockReturnValue(Promise.resolve(savedUser));

      bcryptMock.hash.mockImplementation(() => 'hash password');

      // act
      const result = await service.createUser(fakeAuthUser);

      // assert
      expect(result).toEqual(savedUser);
      expect(result).toBeInstanceOf(ShowUserDTO);

      bcryptMock.hash.mockRestore();
    });
  });
});
