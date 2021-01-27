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

@Controller()
export class AuthController {
  public constructor(
    @Inject(IDENTIFIERS.balanceService)
    private readonly balanceService: ClientProxy,
    @Inject(IDENTIFIERS.budgetService)
    private readonly budgetService: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  public async registerUser(@Body() user: CreateUserDTO) {
    return await this.authService.register(user);
  }

  @Post('/login')
  public async loginUser(@Body() user: CreateUserDTO) {
    const { id, token } = await this.authService.login(user);

    // emit? (for initializing the statistics service)
    this.balanceService
      .send(IDENTIFIERS.getPayments, { userId: id })
      .subscribe();
    this.budgetService.send(IDENTIFIERS.getBudgets, { userId: id }).subscribe();

    return { token };
  }

  @Post('/logout') // blacklisting?
  public async logoutUser(@Token() token: string) {
    console.log(token);

    return {
      msg: 'Successful logout!',
    };
  }
}
