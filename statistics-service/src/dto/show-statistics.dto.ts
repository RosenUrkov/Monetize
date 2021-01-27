import { Expose } from 'class-transformer';
import { ShowBudgetPaymentDTO } from './show-budget-payment.dto';
import { ShowPaymentDTO } from './show-payment.dto';

export class ShowStatisticsDTO {
  @Expose()
  paymentsOfDate: ShowPaymentDTO[];

  @Expose()
  paymentsToBudgetDifference: ShowBudgetPaymentDTO[];
}
