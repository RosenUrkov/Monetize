import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

@Controller()
export class AppController {
  @MessagePattern('StatisticsPing')
  public statisticsPing() {
    return from([7, 8, 9]);
  }

  @EventPattern('StatisticsEmit')
  public statisticsEmit(data) {
    console.log(data);
  }
}
