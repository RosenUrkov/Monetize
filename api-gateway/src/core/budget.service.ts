import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IDENTIFIERS } from 'src/common/identifiers';

@Injectable()
export class BudgetService {
  private readonly pattern = 'BudgetPing';

  public constructor(
    @Inject(IDENTIFIERS.budgetService)
    private readonly budgetService: ClientProxy,
  ) {}

  public ping(data): Observable<string> {
    return this.budgetService.send(this.pattern, data);
  }
}
