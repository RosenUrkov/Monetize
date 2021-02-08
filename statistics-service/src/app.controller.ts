import { UserInfoDTO } from './dto/user-info.dto';
import { GetStatisticsDTO } from './dto/get-statistics-dto';
import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IDENTIFIERS } from './config/identifiers';
import { BalancePayload } from './dto/balance-payload.dto';
import { BudgetPayload } from './dto/budget-payload.dto';
import { ShowStatisticsDTO } from './dto/show-statistics.dto';

@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @MessagePattern(IDENTIFIERS.getStatistics)
  public getStatistics(info: GetStatisticsDTO): Promise<ShowStatisticsDTO> {
    return this.appService.getStatistics(info);
  }

  @EventPattern(IDENTIFIERS.balanceChange)
  public balanceChangeHandler(data: BalancePayload): Promise<void> {
    return this.appService.handleBalanceChange(data);
  }

  @EventPattern(IDENTIFIERS.budgetChange)
  public budgetChangeHandler(data: BudgetPayload): Promise<void> {
    return this.appService.handleBudgetChange(data);
  }

  @EventPattern(IDENTIFIERS.deleteData)
  public deleteDataHandler(data: UserInfoDTO): Promise<void> {
    return this.appService.handleDeleteData(data);
  }
}
