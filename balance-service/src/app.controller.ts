import { UpdatePaymentDTO } from './dto/update-payment.dto';
import { map, tap } from 'rxjs/operators';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { PaymentInfoDTO } from './dto/payment-info.dto';
import { ShowPaymentDTO } from './dto/show-payment.dto';
import { AppService } from './app.service';
import { IDENTIFIERS } from './config/identifiers';
import { UserInfoDTO } from './dto/user-info.dto';

@Controller()
export class AppController {
  public constructor(
    @Inject(IDENTIFIERS.statisticsService)
    private readonly statisticsService: ClientProxy,
    private readonly appService: AppService,
  ) {}

  // @MessagePattern('BalancePing')
  // public balancePing() {
  //   this.statisticsService.emit('pattern', 'FromBalance');
  //   return from([4, 5, 6]);
  // }

  @MessagePattern(IDENTIFIERS.getPayments)
  public getPayments(info: UserInfoDTO): Observable<ShowPaymentDTO[]> {
    return this.appService.getPayments(info);
  }

  @MessagePattern(IDENTIFIERS.getPayment)
  public getPayment(info: PaymentInfoDTO): Observable<ShowPaymentDTO> {
    return this.appService.getPayment(info);
  }

  @MessagePattern(IDENTIFIERS.createPayment)
  public createPayment(info: CreatePaymentDTO): Observable<ShowPaymentDTO> {
    return this.appService.createPayment(info);
  }

  @MessagePattern(IDENTIFIERS.updatePayment)
  public updatePayment(info: UpdatePaymentDTO): Observable<ShowPaymentDTO> {
    return this.appService.updatePayment(info);
  }

  @MessagePattern(IDENTIFIERS.deletePayment)
  public deletePayment(info: PaymentInfoDTO): Observable<ShowPaymentDTO> {
    return this.appService.deletePayment(info);
  }
}
