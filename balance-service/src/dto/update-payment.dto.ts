import { ExpenseCategory } from '../common/enums/expense-category';
import { IncomeCategory } from '../common/enums/income-category.enum';
import { AccountType } from '../common/enums/account-type.enum';
import {
  isCurrency,
  IsNumber,
  IsDate,
  IsDefined,
  IsEnum,
  IsIn,
  Validate,
  IsPositive,
  IsInt,
  IsDateString,
  IsCurrency,
  IsOptional,
} from 'class-validator';
import { PaymentType } from 'src/common/enums/payment-type.enum';
import { IsCorrectPaymentCategoryOfType } from 'src/common/validators/is-correct-payment-category-of-type.validator';
import { IsValidDateString } from 'src/common/validators/is-valid-date-string.validator';

export class UpdatePaymentDTO {
  @IsNumber()
  public paymentId: number;

  @IsNumber()
  public userId: number;

  @IsOptional()
  @IsCurrency({ require_decimal: true })
  public value: string;

  @IsOptional()
  @Validate(IsValidDateString)
  public date: string;

  @IsOptional()
  @IsEnum(PaymentType)
  public type: PaymentType;

  @IsOptional()
  @Validate(IsCorrectPaymentCategoryOfType)
  public category: IncomeCategory | ExpenseCategory;

  @IsOptional()
  @IsEnum(AccountType)
  public account: AccountType;
}
