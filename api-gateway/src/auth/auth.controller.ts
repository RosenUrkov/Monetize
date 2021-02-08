import { Token } from '../middleware/decorators/token.decorator';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Inject,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDTO } from '../dto/auth/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { IDENTIFIERS } from 'src/config/identifiers';
import { ShowUserDTO } from 'src/dto/auth/show-user.dto';
import { User } from 'src/middleware/decorators/user.decorator';

@Controller()
export class AuthController {
  public constructor(
    @Inject(IDENTIFIERS.balanceService)
    private readonly balanceService: ClientProxy,
    @Inject(IDENTIFIERS.budgetService)
    private readonly budgetService: ClientProxy,
    @Inject(IDENTIFIERS.statisticsService)
    private readonly statisticsService: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  public async registerUser(@Body() user: CreateUserDTO) {
    return await this.authService.register(user);
  }

  @Post('/login')
  public async loginUser(@Body() user: CreateUserDTO) {
    const { id, token, expiresIn } = await this.authService.login(user);

    this.balanceService.emit(IDENTIFIERS.userLogin, { userId: id });
    this.budgetService.emit(IDENTIFIERS.userLogin, { userId: id });

    return { token, expiresIn };
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  public async logoutUser(@User() user: ShowUserDTO) {
    this.statisticsService.emit(IDENTIFIERS.deleteData, {
      userId: user.id,
    });

    return {
      message: 'Successful logout!',
    };
  }
}
