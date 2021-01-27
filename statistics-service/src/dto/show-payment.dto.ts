import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class ShowPaymentDTO {
  @IsDefined()
  @Expose()
  public id: number;

  @IsDefined()
  @Expose()
  public value: string;

  @IsDefined()
  @Expose()
  public date: string;

  @IsDefined()
  @Expose()
  public type: string;

  @IsDefined()
  @Expose()
  public category: string;

  @IsDefined()
  @Expose()
  public account: string;
}
