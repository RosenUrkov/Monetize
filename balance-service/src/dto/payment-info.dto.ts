import { IsNumber } from 'class-validator';

export class PaymentInfoDTO {
  @IsNumber()
  public paymentId: number;

  @IsNumber()
  public userId: number;
}
