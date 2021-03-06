import { IsDefined } from 'class-validator';

export class PaymentInfoDTO {
  @IsDefined()
  public paymentId: number;

  @IsDefined()
  public userId: number;
}
