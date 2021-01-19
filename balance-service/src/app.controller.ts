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

  @MessagePattern('BalancePing')
  public balancePing() {
    this.statisticsService.emit('StatisticsEmit', 'FromBalance');
    return from([4, 5, 6]);
  }
}
