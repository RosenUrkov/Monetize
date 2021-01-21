import { Expose, Transform } from 'class-transformer';

export class ShowPaymentDTO {
  @Expose()
  public value: string;

  @Expose()
  @Transform(({ obj }) => obj.details.type.name)
  public type: string;

  @Expose()
  @Transform(({ obj }) => obj.details.category)
  public category: string;
}
