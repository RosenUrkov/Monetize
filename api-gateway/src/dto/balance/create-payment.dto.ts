import { IsDefined } from 'class-validator';

export class CreatePaymentDTO {
  @IsDefined()
  public value: string;

  @IsDefined()
  public date: string;

  @IsDefined()
  public type: string;

  @IsDefined()
  public category: string;

  @IsDefined()
  public account: string;
}
