import { UserInfoDTO } from './dto/user-info.dto';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Inject,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './middleware/decorators/user.decorator';
import { ShowUserDTO } from './dto/auth/show-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { IDENTIFIERS } from './config/identifiers';
import { BudgetInfoDTO } from './dto/budget/budget-info.dto';
import { CreateBudgetDTO } from './dto/budget/create-budget.dto';
import { UpdateBudgetDTO } from './dto/budget/update-budget.dto';
import { Observable } from 'rxjs';
import { ShowBudgetDTO } from './dto/budget/show-budget.dto';

@Controller('/budgets')
@UseGuards(AuthGuard('jwt'))
export class BudgetController {
  public constructor(
    @Inject(IDENTIFIERS.budgetService)
    private readonly budgetService: ClientProxy,
  ) {}

  @Get()
  public getBudgets(@User() user: ShowUserDTO): Observable<ShowBudgetDTO[]> {
    const payload: UserInfoDTO = { userId: user.id };
    return this.budgetService.send(IDENTIFIERS.getBudgets, payload);
  }

  @Get('/:id')
  public getBudget(
    @Param('id') id: string,
    @User() user: ShowUserDTO,
  ): Observable<ShowBudgetDTO> {
    const payload: BudgetInfoDTO = {
      userId: user.id,
      budgetId: +id,
    };

    return this.budgetService.send(IDENTIFIERS.getBudget, payload);
  }

  @Post()
  public createBudget(
    @User() user: ShowUserDTO,
    @Body() info: CreateBudgetDTO,
  ): Observable<ShowBudgetDTO> {
    const payload: UserInfoDTO & CreateBudgetDTO = {
      userId: user.id,
      ...info,
    };

    return this.budgetService.send(IDENTIFIERS.createBudget, payload);
  }

  @Put('/:id')
  public updateBudget(
    @Param('id') id: string,
    @User() user: ShowUserDTO,
    @Body() info: UpdateBudgetDTO,
  ): Observable<ShowBudgetDTO> {
    const payload: BudgetInfoDTO & UpdateBudgetDTO = {
      ...info,
      userId: user.id,
      budgetId: +id,
    };

    return this.budgetService.send(IDENTIFIERS.updateBudget, payload);
  }

  @Delete('/:id')
  public deleteBudget(
    @Param('id') id: string,
    @User() user: ShowUserDTO,
  ): Observable<ShowBudgetDTO> {
    const payload: BudgetInfoDTO = {
      userId: user.id,
      budgetId: +id,
    };

    return this.budgetService.send(IDENTIFIERS.deleteBudget, payload);
  }
}
