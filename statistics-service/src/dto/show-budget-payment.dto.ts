import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class ShowBudgetPaymentDTO {
  @IsDefined()
  @Expose()
  public value: string;

  @IsDefined()
  @Expose()
  public type: string;

  @IsDefined()
  @Expose()
  public category: string;
}
