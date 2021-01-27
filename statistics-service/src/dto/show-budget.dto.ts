import { ShowBudgetPaymentDTO } from './show-budget-payment.dto';
import { Expose, Transform, Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

export class ShowBudgetDTO {
  @IsDefined()
  public id: number;

  @IsDefined()
  public type: string;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ShowBudgetPaymentDTO)
  public payments: ShowBudgetPaymentDTO[];
}
