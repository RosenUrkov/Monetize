import { UserInfoDTO } from './dto/user-info.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
import { ShowPaymentDTO } from 'src/dto/show-payment.dto';
import { CreatePaymentDTO } from 'src/dto/create-payment.dto';
import { PaymentInfoDTO } from 'src/dto/payment-info.dto';
import { plainToClass, TransformPlainToClass } from 'class-transformer';
import { Account } from 'src/entities/account.entity';
import { RpcException } from '@nestjs/microservices';
import { PaymentDetails } from './entities/payment-details.entity';
import { UpdatePaymentDTO } from './dto/update-payment.dto';

@Injectable()
export class AppService {
  public constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(PaymentDetails)
    private readonly paymentDetailsRepository: Repository<PaymentDetails>,
  ) {}

  public async getPayments(info: UserInfoDTO): Promise<ShowPaymentDTO[]> {
    const payments: Payment[] = await this.paymentsRepository.find({
      where: {
        userId: info.userId,
      },
    });

    return plainToClass(ShowPaymentDTO, payments, {
      excludeExtraneousValues: true,
    });
  }

  public async getPayment(info: PaymentInfoDTO): Promise<ShowPaymentDTO> {
    const payment: Payment = await this.paymentsRepository.findOne({
      where: {
        userId: info.userId,
        id: info.paymentId,
      },
    });

    if (!payment) {
      throw new RpcException({
        code: 404,
        message: 'The payment was not found!',
      });
    }

    return plainToClass(ShowPaymentDTO, payment, {
      excludeExtraneousValues: true,
    });
  }

  public async createPayment(info: CreatePaymentDTO): Promise<ShowPaymentDTO> {
    const accountPromise = this.accountsRepository.findOne({
      where: {
        type: info.account,
      },
    });
    const detailsPromise = this.paymentDetailsRepository.findOne({
      where: {
        category: info.category,
      },
    });

    const [account, details] = await Promise.all([
      accountPromise,
      detailsPromise,
    ]);

    if (!account) {
      throw new RpcException({
        code: 400,
        message: 'The account type does not exist!',
      });
    }
    if (!details) {
      throw new RpcException({
        code: 400,
        message: 'The payment category does not exist!',
      });
    }

    const { userId, date, value } = info;
    const paymentInfo: Partial<Payment> = {
      userId,
      date,
      value,
      details,
      account,
    };

    const createdPayment = this.paymentsRepository.create(paymentInfo);
    const savedPayment = await this.paymentsRepository.save(createdPayment);

    return plainToClass(ShowPaymentDTO, savedPayment, {
      excludeExtraneousValues: true,
    });
  }

  public async updatePayment(
    info: Partial<UpdatePaymentDTO>,
  ): Promise<ShowPaymentDTO> {
    const payment: Payment = await this.paymentsRepository.findOne({
      where: {
        userId: info.userId,
        id: info.paymentId,
      },
    });

    if (!payment) {
      throw new RpcException({
        code: 404,
        message: 'The payment was not found!',
      });
    }

    const changedRelationsPromises: Promise<any>[] = [];
    if (info.account && payment.account.type !== info.account) {
      const accountPromise = this.accountsRepository.findOne({
        where: {
          type: info.account,
        },
      });

      changedRelationsPromises.push(accountPromise);
    } else {
      changedRelationsPromises.push(Promise.resolve(null));
    }

    if (
      info.type &&
      info.category &&
      payment.details.category !== info.category
    ) {
      const detailsPromise = this.paymentDetailsRepository.findOne({
        where: {
          category: info.category,
        },
      });

      changedRelationsPromises.push(detailsPromise);
    } else {
      changedRelationsPromises.push(Promise.resolve(null));
    }

    const [changedAccount, changedDetails] = await Promise.all(
      changedRelationsPromises,
    );

    const { account, type, category, ...updatedDetails } = info;

    const paymentInfo: Partial<Payment> = {
      ...payment,
      ...updatedDetails,
    };

    if (changedAccount) {
      paymentInfo.account = changedAccount;
    }
    if (changedDetails) {
      paymentInfo.details = changedDetails;
    }

    const savedPayment = await this.paymentsRepository.save(paymentInfo);

    return plainToClass(ShowPaymentDTO, savedPayment, {
      excludeExtraneousValues: true,
    });
  }

  public async deletePayment(info: PaymentInfoDTO): Promise<ShowPaymentDTO> {
    const payment: Payment = await this.paymentsRepository.findOne({
      where: {
        userId: info.userId,
        id: info.paymentId,
      },
    });

    if (!payment) {
      throw new RpcException({
        code: 404,
        message: 'The payment was not found!',
      });
    }

    const deletedPayment = await this.paymentsRepository.delete(payment.id);

    return plainToClass(ShowPaymentDTO, payment, {
      excludeExtraneousValues: true,
    });
  }
}
