import {
  IsNumber,
  IsCurrency,
  Validate,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { CreatePaymentDTO } from './create-payment.dto';
import { Type } from 'class-transformer';
import { BudgetType } from 'src/common/enums/budget-type.enum';
import { HasDuplicatePaymentDetails } from 'src/common/validators/has-duplicate-payment-details.validator';

export class CreateBudgetDTO {
  @IsNumber()
  public userId: number;

  @IsEnum(BudgetType)
  public type: BudgetType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDTO)
  @Validate(HasDuplicatePaymentDetails)
  public payments: CreatePaymentDTO[];
}
