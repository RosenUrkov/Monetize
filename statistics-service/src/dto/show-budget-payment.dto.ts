import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

export class ShowBudgetPaymentDTO {
  @IsString()
  @Expose()
  public value: string;

  @IsString()
  @Expose()
  public type: string;

  @IsString()
  @Expose()
  public category: string;
}
