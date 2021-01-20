import { Expose, Transform } from 'class-transformer';

export class ShowPaymentDTO {
  @Expose()
  public id: number;

  @Expose()
  public value: string;

  @Expose()
  public date: string;

  @Expose()
  @Transform(({ obj }) => obj.details.type.name)
  public type: string;

  @Expose()
  @Transform(({ obj }) => obj.details.category)
  public category: string;

  @Expose()
  @Transform(({ obj }) => obj.account.type)
  public account: string;
}
