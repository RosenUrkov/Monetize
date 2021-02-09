import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class ShowPaymentDTO {
  @IsNumber()
  @Expose()
  public id: number;

  @IsString()
  @Expose()
  public value: string;

  @IsString()
  @Expose()
  public date: string;

  @IsString()
  @Expose()
  public type: string;

  @IsString()
  @Expose()
  public category: string;

  @IsString()
  @Expose()
  public account: string;
}
