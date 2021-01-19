import { BudgetService } from './services/budget.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { map, tap } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { BalanceService } from './services/balance.service';
import { StatisticsService } from './services/statistics.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class AppController {
  public constructor(
    private readonly balanceService: BalanceService,
    private readonly budgetService: BudgetService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Get('/balance')
  public pingBalanceService(): Observable<string> {
    return this.balanceService
      .ping('hello')
      .pipe(tap((message: string) => console.log(message)));
  }

  @Get('/budget')
  public pingBudgetService(): Observable<string> {
    return this.budgetService
      .ping('hello')
      .pipe(tap((message: string) => console.log(message)));
  }

  @Get('/statistics')
  public pingStatisticsService(): Observable<string> {
    return this.statisticsService
      .ping('hello')
      .pipe(tap((message: string) => console.log(message)));
  }

  @Get('/all')
  public pingAll() {
    return zip(
      this.balanceService.ping('hello'),
      this.budgetService.ping('hello'),
      this.statisticsService.ping('hello'),
    ).pipe(
      tap(console.log),
      map(([res1, res2, res3]) => ({
        res1,
        res2,
        res3,
      })),
    );
  }
}
