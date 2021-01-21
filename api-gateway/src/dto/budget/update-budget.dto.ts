import { Type } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { CreatePaymentDTO } from './create-payment.dto';

export class UpdateBudgetDTO {
  @IsDefined()
  public type: string;

  @IsDefined()
  @Type(() => CreatePaymentDTO)
  public payments: CreatePaymentDTO[];
}
