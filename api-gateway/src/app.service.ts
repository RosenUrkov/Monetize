import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  public constructor(
    @Inject('BalanceService') private readonly balanceService: ClientProxy,
    @Inject('BudgetService') private readonly budgetService: ClientProxy,
    @Inject('StatisticsService')
    private readonly statisticsService: ClientProxy,
  ) {}

  public pingBalanceService(): Observable<string> {
    const pattern = 'BalancePing';

    return this.balanceService.send(pattern, pattern);
  }

  public pingBudgetService(): Observable<string> {
    const pattern = 'BudgetPing';

    return this.budgetService.send(pattern, pattern);
  }

  public pingStatisticsService(): Observable<string> {
    const pattern = 'StatisticsPing';

    return this.statisticsService.send(pattern, pattern);
  }
}
