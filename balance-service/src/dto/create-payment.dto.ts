import { AccountType } from '../common/account-type.enum';
import { IsCurrency, IsDefined, IsEnum } from 'class-validator';
import { PaymentCategory } from 'src/entities/payment-category.entity';
import { PaymentType } from 'src/common/payment-type.enum';

export class CreatePaymentDTO {
  @IsCurrency({ require_decimal: true })
  public value: number;

  @IsEnum(PaymentType)
  public type: PaymentType;

  @IsEnum(PaymentCategory)
  public category: PaymentCategory;

  @IsEnum(AccountType)
  public account: AccountType;
}
