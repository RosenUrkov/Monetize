import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IDENTIFIERS } from 'src/config/identifiers';

@Injectable()
export class StatisticsService {
  private readonly pattern = 'StatisticsPing';

  public constructor(
    @Inject(IDENTIFIERS.statisticsService)
    private readonly statisticsService: ClientProxy,
  ) {}

  public ping(data): Observable<string> {
    return this.statisticsService.send(this.pattern, data);
  }
}
