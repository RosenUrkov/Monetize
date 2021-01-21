import { Expose } from 'class-transformer';

export class ShowPaymentDTO {
  @Expose()
  public value: string;

  @Expose()
  public type: string;

  @Expose()
  public category: string;
}
