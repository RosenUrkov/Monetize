import { Type } from 'class-transformer';
import {
  IsNumber,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  Validate,
} from 'class-validator';
import { BudgetType } from 'src/common/enums/budget-type.enum';
import { HasDuplicatePaymentDetails } from 'src/common/validators/has-duplicate-payment-details.validator';
import { CreatePaymentDTO } from './create-payment.dto';

export class UpdateBudgetDTO {
  @IsNumber()
  public budgetId: number;

  @IsNumber()
  public userId: number;

  @IsOptional()
  @IsEnum(BudgetType)
  public type: BudgetType;

  @IsOptional()
  @IsArray()
  @Type(() => CreatePaymentDTO)
  @ValidateNested({ each: true })
  @Validate(HasDuplicatePaymentDetails)
  public payments: CreatePaymentDTO[];
}
