import { MicroserviceErrorInterceptor } from './middleware/interceptors/microservice-error.interceptor';
import { BudgetService } from './services/budget.service';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Query,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { map, tap } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { StatisticsService } from './services/statistics.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './middleware/decorators/user.decorator';
import { ShowUserDTO } from './dto/show-user.dto';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class AppController {
  public constructor(
    private readonly budgetService: BudgetService,
    private readonly statisticsService: StatisticsService,
  ) {}

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
