import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../../dto/auth/create-user.dto';
import { ShowUserDTO } from '../../dto/auth/show-user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(user: CreateUserDTO): Promise<ShowUserDTO> {
    return this.userService.createUser(user);
  }

  public async login(user: CreateUserDTO): Promise<any> {
    const foundUser: ShowUserDTO = await this.userService.findUserByUsername(
      user.username,
    );

    if (!foundUser) {
      throw new BadRequestException('User with such username does not exist!');
    }
    if (!(await this.userService.validateUserPassword(user))) {
      throw new BadRequestException('Invalid password!');
    }

    const payload: ShowUserDTO = { ...foundUser };

    return {
      id: foundUser.id,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
