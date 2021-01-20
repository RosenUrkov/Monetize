import { UserInfoDTO } from './dto/user-info.dto';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
import { ShowPaymentDTO } from 'src/dto/show-payment.dto';
import { CreatePaymentDTO } from 'src/dto/create-payment.dto';
import { PaymentInfoDTO } from 'src/dto/payment-info.dto';
import { plainToClass } from 'class-transformer';
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

  public getPayments(info: UserInfoDTO): Observable<ShowPaymentDTO[]> {
    const paymentsPromise: Promise<Payment[]> = this.paymentsRepository.find({
      where: {
        userId: info.userId,
      },
    });

    return from(paymentsPromise).pipe(
      map((entity) =>
        plainToClass(ShowPaymentDTO, entity, { excludeExtraneousValues: true }),
      ),
    );
  }

  public getPayment(info: PaymentInfoDTO): Observable<ShowPaymentDTO> {
    const paymentPromise: Promise<Payment> = this.paymentsRepository.findOneOrFail(
      {
        where: {
          userId: info.userId,
          id: info.paymentId,
        },
      },
    );

    return from(paymentPromise).pipe(
      catchError(() =>
        throwError(
          new RpcException({
            code: 404,
            message: 'The payment was not found!',
          }),
        ),
      ),
      map((entity) =>
        plainToClass(ShowPaymentDTO, entity, { excludeExtraneousValues: true }),
      ),
    );
  }

  public createPayment(info: CreatePaymentDTO): Observable<ShowPaymentDTO> {
    const accountPromise = this.accountsRepository.findOneOrFail({
      where: {
        type: info.account,
      },
    });
    const detailsPromise = this.paymentDetailsRepository.findOneOrFail({
      where: {
        category: info.category,
      },
    });

    const paymentPromise = Promise.all([accountPromise, detailsPromise]).then(
      ([account, details]) => {
        const { userId, date, value } = info;
        const paymentInfo: Partial<Payment> = {
          userId,
          date,
          value,
          details,
          account,
        };

        const payment = this.paymentsRepository.create(paymentInfo);
        return this.paymentsRepository.save(payment);
      },
    );

    return from(paymentPromise).pipe(
      catchError((err) => {
        return throwError(
          new RpcException({
            code: 400,
            message: 'The payment creation failed!',
          }),
        );
      }),
      map((entity) =>
        plainToClass(ShowPaymentDTO, entity, { excludeExtraneousValues: true }),
      ),
    );
  }

  public updatePayment(
    info: Partial<UpdatePaymentDTO>,
  ): Observable<ShowPaymentDTO> {
    const paymentPromise: Promise<Payment> = this.paymentsRepository.findOneOrFail(
      {
        where: {
          userId: info.userId,
          id: info.paymentId,
        },
      },
    );

    return from(paymentPromise).pipe(
      catchError(() =>
        throwError(
          new RpcException({
            code: 404,
            message: 'The payment was not found!',
          }),
        ),
      ),
      mergeMap((entity) => {
        const changedRelationsPromises: Promise<any>[] = [
          Promise.resolve(entity),
        ];

        if (info.account && entity.account.type !== info.account) {
          const accountPromise = this.accountsRepository.findOneOrFail({
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
          entity.details.category !== info.category
        ) {
          const detailsPromise = this.paymentDetailsRepository.findOneOrFail({
            where: {
              category: info.category,
            },
          });

          changedRelationsPromises.push(detailsPromise);
        } else {
          changedRelationsPromises.push(Promise.resolve(null));
        }

        return from(Promise.all(changedRelationsPromises));
      }),
      mergeMap(([entity, accountEntity, detailsEntity]) => {
        const { account, type, category, ...updatedDetails } = info;

        const paymentInfo: Partial<Payment> = {
          ...entity,
          ...updatedDetails,
        };

        if (accountEntity) {
          paymentInfo.account = accountEntity;
        }
        if (detailsEntity) {
          paymentInfo.details = detailsEntity;
        }

        return from(this.paymentsRepository.save(paymentInfo));
      }),
      catchError((err) => {
        if (err.error) {
          return throwError(err);
        }

        return throwError(
          new RpcException({
            code: 400,
            message: 'The payment update failed!',
          }),
        );
      }),
      map((entity) => {
        console.log(entity);

        return plainToClass(ShowPaymentDTO, entity, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }

  public deletePayment(info: PaymentInfoDTO): Observable<ShowPaymentDTO> {
    const paymentPromise: Promise<Payment> = this.paymentsRepository.findOneOrFail(
      {
        where: {
          userId: info.userId,
          id: info.paymentId,
        },
      },
    );

    return from(paymentPromise).pipe(
      catchError((err) => {
        console.log(err);

        return throwError(
          new RpcException({
            code: 404,
            message: 'The payment was not found!',
          }),
        );
      }),
      mergeMap((entity) => {
        const promise = this.paymentsRepository
          .delete(entity.id)
          .then(() => entity);

        return from(promise);
      }),
      catchError((err) => {
        if (err.error) {
          return throwError(err);
        }

        return throwError(
          new RpcException({
            code: 400,
            message: 'The payment delete failed!',
          }),
        );
      }),
      map((entity) => {
        return plainToClass(ShowPaymentDTO, entity, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
