import { IsDefined } from 'class-validator';

export class PaymentInfoDTO {
  @IsDefined()
  public id: string;
}
