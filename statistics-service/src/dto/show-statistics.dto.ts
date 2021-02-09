import { Expose, Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { ShowBudgetPaymentDTO } from './show-budget-payment.dto';
import { ShowPaymentDTO } from './show-payment.dto';

export class ShowStatisticsDTO {
  @Expose()
  @IsArray()
  @Type(() => ShowPaymentDTO)
  paymentsOfDate: ShowPaymentDTO[];

  @Expose()
  @IsArray()
  @Type(() => ShowBudgetPaymentDTO)
  paymentsToBudgetDifference: ShowBudgetPaymentDTO[];
}
