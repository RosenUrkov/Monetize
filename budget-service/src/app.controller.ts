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
  public getBudgets(info: UserInfoDTO): Promise<ShowBudgetDTO[]> {
    return this.appService.getBudgets(info);
  }

  @MessagePattern(IDENTIFIERS.getBudget)
  public getBudget(info: BudgetInfoDTO): Promise<ShowBudgetDTO> {
    return this.appService.getBudget(info);
  }

  @MessagePattern(IDENTIFIERS.createBudget)
  public createBudget(info: CreateBudgetDTO): Promise<ShowBudgetDTO> {
    return this.appService.createBudget(info);
  }

  @MessagePattern(IDENTIFIERS.updateBudget)
  public updateBudget(info: UpdateBudgetDTO): Promise<ShowBudgetDTO> {
    return this.appService.updateBudget(info);
  }

  @MessagePattern(IDENTIFIERS.deleteBudget)
  public deleteBudget(info: BudgetInfoDTO): Promise<ShowBudgetDTO> {
    return this.appService.deleteBudget(info);
  }
}
