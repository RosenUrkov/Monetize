import { Expose, Transform } from 'class-transformer';
import { ShowPaymentDTO } from './show-payment.dto';

export class ShowBudgetDTO {
  @Expose()
  public id: number;

  @Expose()
  @Transform(({ obj }) => obj.type.name)
  public type: string;

  @Expose()
  @Transform(({ obj }) => obj.payments) // todo
  public payments: ShowPaymentDTO[];
}
