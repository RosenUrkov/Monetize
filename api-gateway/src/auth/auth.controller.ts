import { Token } from '../middleware/decorators/token.decorator';
import { Controller, Post, Body, UseGuards, Delete } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async registerUser(@Body() user: CreateUserDTO) {
    return await this.authService.register(user);
  }

  @Post('/login')
  public async loginUser(@Body() user: CreateUserDTO) {
    return await this.authService.login(user);
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt')) // blacklisting?
  public async logoutUser(@Token() token: string) {
    console.log(token);

    return {
      msg: 'Successful logout!',
    };
  }
}
