import { Expose } from 'class-transformer';
import { ShowPaymentDTO } from './show-payment.dto';

export class ShowBudgetDTO {
  @Expose()
  public id: number;

  @Expose()
  public type: string;

  @Expose()
  public payments: ShowPaymentDTO[];
}
