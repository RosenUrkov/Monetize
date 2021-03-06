import { Expose } from 'class-transformer';

export class ShowPaymentDTO {
  @Expose()
  public id: number;

  @Expose()
  public value: string;

  @Expose()
  public date: string;

  @Expose()
  public type: string;

  @Expose()
  public category: string;

  @Expose()
  public account: string;
}
