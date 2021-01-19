import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { map, tap } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';

@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @Get('/balance')
  public pingBalanceService(): Observable<string> {
    return this.appService
      .pingBalanceService()
      .pipe(tap((message: string) => console.log(message)));
  }

  @Get('/budget')
  public pingBudgetService(): Observable<string> {
    return this.appService
      .pingBudgetService()
      .pipe(tap((message: string) => console.log(message)));
  }

  @Get('/statistics')
  public pingStatisticsService(): Observable<string> {
    return this.appService
      .pingStatisticsService()
      .pipe(tap((message: string) => console.log(message)));
  }

  @Get('/all')
  public pingAll() {
    return zip(
      this.appService.pingBalanceService(),
      this.appService.pingBudgetService(),
      this.appService.pingStatisticsService(),
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
