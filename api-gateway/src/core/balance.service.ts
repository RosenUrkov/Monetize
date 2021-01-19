import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IDENTIFIERS } from '../common/identifiers';

@Injectable()
export class BalanceService {
  private readonly pattern = 'BalancePing';

  public constructor(
    @Inject(IDENTIFIERS.balanceService)
    private readonly balanceService: ClientProxy,
  ) {}

  public ping(data): Observable<string> {
    return this.balanceService.send(this.pattern, data);
  }
}
