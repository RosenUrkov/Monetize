import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IDENTIFIERS } from 'src/config/identifiers';

@Injectable()
export class StatisticsService {
  private readonly pattern = 'StatisticsEmit';

  constructor(
    @Inject(IDENTIFIERS.statisticsService)
    private readonly statisticsService: ClientProxy,
  ) {}

  public emit(data): void {
    this.statisticsService.emit(this.pattern, data);
  }
}
