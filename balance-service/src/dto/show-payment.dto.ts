import { Expose, Transform } from 'class-transformer';

export class ShowPaymentDTO {
  @Expose()
  public value: number;

  @Expose()
  public type: string;

  @Expose()
  @Transform(({ obj }) => obj.name)
  public category: string;

  @Expose()
  @Transform(({ obj }) => obj.type)
  public account: string;
}
