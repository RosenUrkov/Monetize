import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { ShowPaymentDTO } from './show-payment.dto';

export class BalancePayload {
  @IsDefined()
  userId: number;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ShowPaymentDTO)
  payments: ShowPaymentDTO[];
}
