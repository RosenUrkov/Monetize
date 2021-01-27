import { ShowBudgetDTO } from './dto/show-budget.dto';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppService } from './app.service';
import { IDENTIFIERS } from './config/identifiers';
import { UserInfoDTO } from './dto/user-info.dto';
import { BudgetInfoDTO } from './dto/budget-info.dto';
import { CreateBudgetDTO } from './dto/create-budget.dto';
import { UpdateBudgetDTO } from './dto/update-budget.dto';

@Controller()
export class AppController {
  constructor(
    @Inject(IDENTIFIERS.statisticsService)
    private readonly statisticsService: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @MessagePattern(IDENTIFIERS.getBudgets)
  public async getBudgets(info: UserInfoDTO): Promise<ShowBudgetDTO[]> {
    const budgets: ShowBudgetDTO[] = await this.appService.getBudgets(info);

    const payload = { userId: info.userId, budgets };
    this.statisticsService.emit(IDENTIFIERS.budgetAction, payload);

    return budgets;
  }

  @MessagePattern(IDENTIFIERS.getBudget)
  public async getBudget(info: BudgetInfoDTO): Promise<ShowBudgetDTO> {
    const budget: ShowBudgetDTO = await this.appService.getBudget(info);

    this.getBudgets({ ...info });

    return budget;
  }

  @MessagePattern(IDENTIFIERS.createBudget)
  public async createBudget(info: CreateBudgetDTO): Promise<ShowBudgetDTO> {
    const budget: ShowBudgetDTO = await this.appService.createBudget(info);

    this.getBudgets({ ...info });

    return budget;
  }

  @MessagePattern(IDENTIFIERS.updateBudget)
  public async updateBudget(info: UpdateBudgetDTO): Promise<ShowBudgetDTO> {
    const budget: ShowBudgetDTO = await this.appService.updateBudget(info);

    this.getBudgets({ ...info });

    return budget;
  }

  @MessagePattern(IDENTIFIERS.deleteBudget)
  public async deleteBudget(info: BudgetInfoDTO): Promise<ShowBudgetDTO> {
    const budget: ShowBudgetDTO = await this.appService.deleteBudget(info);

    this.getBudgets({ ...info });

    return budget;
  }
}
