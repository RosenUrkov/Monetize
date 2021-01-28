import { Expose, Type } from 'class-transformer';
import { ShowBudgetPaymentDTO } from './show-budget-payment.dto';
import { ShowPaymentDTO } from './show-payment.dto';

export class ShowStatisticsDTO {
  @Expose()
  @Type(() => ShowPaymentDTO)
  paymentsOfDate: ShowPaymentDTO[];

  @Expose()
  @Type(() => ShowBudgetPaymentDTO)
  paymentsToBudgetDifference: ShowBudgetPaymentDTO[];
}
