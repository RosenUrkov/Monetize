import { ShowBudgetPaymentDTO } from './show-budget-payment.dto';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  ValidateNested,
  IsNumber,
  IsString,
} from 'class-validator';

export class ShowBudgetDTO {
  @IsNumber()
  public id: number;

  @IsString()
  public type: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShowBudgetPaymentDTO)
  public payments: ShowBudgetPaymentDTO[];
}
