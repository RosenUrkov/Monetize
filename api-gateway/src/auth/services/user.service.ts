import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../../dto/auth/create-user.dto';
import { ShowUserDTO } from '../../dto/auth/show-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass, TransformPlainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async findUserByUsername(username: string): Promise<ShowUserDTO> {
    const foundUser: User = await this.usersRepository.findOne({
      username,
    });

    return plainToClass(ShowUserDTO, foundUser, {
      excludeExtraneousValues: true,
    });
  }

  public async validateUserPassword(user: CreateUserDTO): Promise<boolean> {
    const userEntity: User = await this.usersRepository.findOne({
      username: user.username,
    });

    return await bcrypt.compare(user.password, userEntity.password);
  }

  public async createUser(user: CreateUserDTO): Promise<ShowUserDTO> {
    const foundUser: User = await this.usersRepository.findOne({
      username: user.username,
    });
    if (foundUser) {
      throw new BadRequestException('User with such username already exists!');
    }

    const userEntity: User = this.usersRepository.create(user);
    userEntity.password = await bcrypt.hash(user.password, 10);
    const createdUser: User = await this.usersRepository.save(userEntity);

    return plainToClass(ShowUserDTO, createdUser, {
      excludeExtraneousValues: true,
    });
  }
}
