import { Type } from 'class-transformer';
import { IsDefined, ValidateNested, IsNumber, IsArray } from 'class-validator';
import { ShowPaymentDTO } from './show-payment.dto';

export class BalancePayload {
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShowPaymentDTO)
  payments: ShowPaymentDTO[];
}
