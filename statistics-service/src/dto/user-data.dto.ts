import { BudgetPayload } from './budget-payload.dto';
import { BalancePayload } from '../dto/balance-payload.dto';
import { IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ShowPaymentDTO } from './show-payment.dto';
import { ShowBudgetDTO } from './show-budget.dto';

export class UserDataDTO {
  @IsArray()
  @Type(() => ShowPaymentDTO)
  public payments: ShowPaymentDTO[];

  @IsArray()
  @Type(() => ShowBudgetDTO)
  public budgets: ShowBudgetDTO[];
}
