import { IsCurrency, IsEnum, Validate } from 'class-validator';
import { ExpenseCategory } from '../common/enums/expense-category';
import { IncomeCategory } from '../common/enums/income-category.enum';
import { PaymentType } from '../common/enums/payment-type.enum';
import { IsCorrectPaymentCategoryOfType } from '../common/validators/is-correct-payment-category-of-type.validator';

export class CreatePaymentDTO {
  @IsCurrency({ require_decimal: true })
  public value: string;

  @IsEnum(PaymentType)
  public type: PaymentType;

  @Validate(IsCorrectPaymentCategoryOfType)
  public category: IncomeCategory | ExpenseCategory;
}
