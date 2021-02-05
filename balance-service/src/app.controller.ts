import { UpdatePaymentDTO } from './dto/update-payment.dto';
import { map, tap } from 'rxjs/operators';
import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
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

  @MessagePattern(IDENTIFIERS.getPayments)
  public async getPayments(info: UserInfoDTO): Promise<ShowPaymentDTO[]> {
    const payments: ShowPaymentDTO[] = await this.appService.getPayments(info);
    const payload = {
      userId: info.userId,
      payments,
    };
    this.statisticsService.emit(IDENTIFIERS.balanceAction, payload);

    return payments;
  }

  @MessagePattern(IDENTIFIERS.getPayment)
  public async getPayment(info: PaymentInfoDTO): Promise<ShowPaymentDTO> {
    const payment: ShowPaymentDTO = await this.appService.getPayment(info);

    this.getPayments({ ...info });

    return payment;
  }

  @MessagePattern(IDENTIFIERS.createPayment)
  public async createPayment(info: CreatePaymentDTO): Promise<ShowPaymentDTO> {
    const payment: ShowPaymentDTO = await this.appService.createPayment(info);

    this.getPayments({ ...info });

    return payment;
  }

  @MessagePattern(IDENTIFIERS.updatePayment)
  public async updatePayment(info: UpdatePaymentDTO): Promise<ShowPaymentDTO> {
    const payment: ShowPaymentDTO = await this.appService.updatePayment(info);

    this.getPayments({ ...info });

    return payment;
  }

  @MessagePattern(IDENTIFIERS.deletePayment)
  public async deletePayment(info: PaymentInfoDTO): Promise<ShowPaymentDTO> {
    const payment: ShowPaymentDTO = await this.appService.deletePayment(info);

    this.getPayments({ ...info });

    return payment;
  }

  @EventPattern(IDENTIFIERS.userAuthenticated)
  public userAuthenticated(info: UserInfoDTO) {
    this.getPayments(info);
  }
}
