import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { PaymentInfoDTO } from './dto/payment-info.dto';
import { ShowPaymentDTO } from './dto/show-payment.dto';
import { UserInfoDTO } from './dto/user-info.dto';
import { PaymentService } from './services/payment.service';
import { StatisticsService } from './services/statistics.service';

@Controller()
export class AppController {
  public constructor(
    private readonly statisticsService: StatisticsService,
    private readonly paymentsService: PaymentService,
  ) {}

  @MessagePattern('BalancePing')
  public balancePing() {
    this.statisticsService.emit('FromBalance');
    return from([4, 5, 6]);
  }

  // @MessagePattern('getPayments')
  // public getPayments(info: UserInfoDTO): Observable<ShowPaymentDTO[]> {}

  // @MessagePattern('getPayment')
  // public getPayment(
  //   info: UserInfoDTO & PaymentInfoDTO,
  // ): Observable<ShowPaymentDTO> {}

  // @MessagePattern('createPayment')
  // public createPayment(
  //   info: UserInfoDTO & CreatePaymentDTO,
  // ): Observable<ShowPaymentDTO> {}

  // @MessagePattern('updatePayment')
  // public updatePayment({ userId, Payment }) {}

  // @MessagePattern('deletePayment')
  // public deletePayment({ userId, PaymentId }) {}
}
