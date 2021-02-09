import { Type } from 'class-transformer';
import { IsDefined, ValidateNested, IsNumber, IsArray } from 'class-validator';
import { ShowBudgetDTO } from './show-budget.dto';

export class BudgetPayload {
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShowBudgetDTO)
  budgets: ShowBudgetDTO[];
}
