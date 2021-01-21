import { IsCurrency, IsEnum, Validate } from 'class-validator';
import { ExpenseCategory } from 'src/common/enums/expense-category';
import { IncomeCategory } from 'src/common/enums/income-category.enum';
import { PaymentType } from 'src/common/enums/payment-type.enum';
import { IsCorrectPaymentCategoryOfType } from 'src/common/validators/is-correct-payment-category-of-type.validator';

export class CreatePaymentDTO {
  @IsCurrency({ require_decimal: true })
  public value: string;

  @IsEnum(PaymentType)
  public type: PaymentType;

  @Validate(IsCorrectPaymentCategoryOfType)
  public category: IncomeCategory | ExpenseCategory;
}
