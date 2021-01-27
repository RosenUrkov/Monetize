import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { ShowBudgetDTO } from './show-budget.dto';

export class BudgetPayload {
  @IsDefined()
  userId: number;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ShowBudgetDTO)
  budgets: ShowBudgetDTO[];
}
