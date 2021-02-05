import { UserInfoDTO } from './dto/user-info.dto';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Inject,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './middleware/decorators/user.decorator';
import { ShowUserDTO } from './dto/auth/show-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { IDENTIFIERS } from './config/identifiers';
import { PaymentInfoDTO } from './dto/balance/payment-info.dto';
import { CreatePaymentDTO } from './dto/balance/create-payment.dto';
import { UpdatePaymentDTO } from './dto/balance/update-payment.dto';
import { Observable } from 'rxjs';
import { ShowPaymentDTO } from './dto/balance/show-payment.dto';

@Controller('/payments')
@UseGuards(AuthGuard('jwt'))
export class BalanceController {
  public constructor(
    @Inject(IDENTIFIERS.balanceService)
    private readonly balanceService: ClientProxy,
  ) {}

  @Get()
  public getPayments(@User() user: ShowUserDTO): Observable<ShowPaymentDTO[]> {
    const payload: UserInfoDTO = { userId: user.id };
    return this.balanceService.send(IDENTIFIERS.getPayments, payload);
  }

  @Get('/:id')
  public getPayment(
    @Param('id') id: string,
    @User() user: ShowUserDTO,
  ): Observable<ShowPaymentDTO> {
    const payload: PaymentInfoDTO = {
      userId: user.id,
      paymentId: +id,
    };
    return this.balanceService.send(IDENTIFIERS.getPayment, payload);
  }

  @Post()
  public createPayment(
    @User() user: ShowUserDTO,
    @Body() info: CreatePaymentDTO,
  ): Observable<ShowPaymentDTO> {
    const payload: CreatePaymentDTO & UserInfoDTO = {
      ...info,
      userId: user.id,
    };

    return this.balanceService.send(IDENTIFIERS.createPayment, payload);
  }

  @Put('/:id')
  public updatePayment(
    @Param('id') id: string,
    @User() user: ShowUserDTO,
    @Body() info: UpdatePaymentDTO,
  ): Observable<ShowPaymentDTO> {
    const payload: UpdatePaymentDTO & PaymentInfoDTO = {
      ...info,
      userId: user.id,
      paymentId: +id,
    };

    return this.balanceService.send(IDENTIFIERS.updatePayment, payload);
  }

  @Delete('/:id')
  public deletePayment(
    @Param('id') id: string,
    @User() user: ShowUserDTO,
  ): Observable<ShowPaymentDTO> {
    const payload: PaymentInfoDTO = {
      userId: user.id,
      paymentId: +id,
    };

    return this.balanceService.send(IDENTIFIERS.deletePayment, payload);
  }
}
