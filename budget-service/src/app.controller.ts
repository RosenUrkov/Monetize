import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(
    @Inject('StatisticsService')
    private readonly statisticsService: ClientProxy,
  ) {}

  @MessagePattern('BudgetPing')
  public budgetPing() {
    this.statisticsService.emit('StatisticsEmit', 'FromBudget');
    return from([1, 2, 3]);
  }
}
