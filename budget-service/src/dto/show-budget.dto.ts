import { Expose, Transform, Type } from 'class-transformer';
import { ShowPaymentDTO } from './show-payment.dto';

export class ShowBudgetDTO {
  @Expose()
  public id: number;

  @Expose()
  @Transform(({ obj }) => obj.type.name)
  public type: string;

  @Expose()
  @Type(() => ShowPaymentDTO)
  public payments: ShowPaymentDTO[];
}
