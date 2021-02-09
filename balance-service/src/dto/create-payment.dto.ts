import { ExpenseCategory } from '../common/enums/expense-category';
import { IncomeCategory } from '../common/enums/income-category.enum';
import { AccountType } from '../common/enums/account-type.enum';
import {
  IsNumber,
  IsDate,
  IsDefined,
  IsEnum,
  IsIn,
  Validate,
  IsCurrency,
} from 'class-validator';
import { PaymentType } from '../common/enums/payment-type.enum';
import { IsCorrectPaymentCategoryOfType } from '../common/validators/is-correct-payment-category-of-type.validator';
import { IsValidDateString } from '../common/validators/is-valid-date-string.validator';

export class CreatePaymentDTO {
  @IsNumber()
  public userId: number;

  @IsCurrency({ require_decimal: true })
  public value: string;

  @Validate(IsValidDateString)
  public date: string;

  @IsEnum(PaymentType)
  public type: PaymentType;

  @Validate(IsCorrectPaymentCategoryOfType)
  public category: IncomeCategory | ExpenseCategory;

  @IsEnum(AccountType)
  public account: AccountType;
}
