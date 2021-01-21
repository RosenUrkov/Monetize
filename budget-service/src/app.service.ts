import { BudgetType } from './entities/budget-type.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, merge, Observable, of, throwError } from 'rxjs';
import { In, Repository } from 'typeorm';
import { BudgetInfoDTO } from './dto/budget-info.dto';
import { CreateBudgetDTO } from './dto/create-budget.dto';
import { ShowBudgetDTO } from './dto/show-budget.dto';
import { UpdateBudgetDTO } from './dto/update-budget.dto';
import { UserInfoDTO } from './dto/user-info.dto';
import { Budget } from './entities/budget.entity';
import { PaymentDetails } from './entities/payment-details.entity';
import { Payment } from './entities/payment.entity';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  public constructor(
    @InjectRepository(Budget)
    private readonly budgetsRepository: Repository<Budget>,
    @InjectRepository(BudgetType)
    private readonly budgetTypesRepository: Repository<BudgetType>,
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(PaymentDetails)
    private readonly paymentDetailsRepository: Repository<PaymentDetails>,
  ) {}

  public getBudgets(info: UserInfoDTO): Observable<ShowBudgetDTO[]> {
    const budgetsPromise: Promise<Budget[]> = this.budgetsRepository.find({
      where: {
        userId: info.userId,
      },
    });

    return from(budgetsPromise).pipe(
      map((entity) =>
        plainToClass(ShowBudgetDTO, entity, { excludeExtraneousValues: true }),
      ),
    );
  }

  public getBudget(info: BudgetInfoDTO): Observable<ShowBudgetDTO> {
    const budgetsPromise: Promise<Budget> = this.budgetsRepository.findOneOrFail(
      {
        where: {
          userId: info.userId,
          id: info.budgetId,
        },
      },
    );

    return from(budgetsPromise).pipe(
      catchError(() =>
        throwError(
          new RpcException({
            code: 404,
            message: 'The budget was not found!',
          }),
        ),
      ),
      map((entity) =>
        plainToClass(ShowBudgetDTO, entity, { excludeExtraneousValues: true }),
      ),
    );
  }

  public createBudget(info: CreateBudgetDTO): Observable<ShowBudgetDTO> {
    const budgetsPromise: Promise<Budget[]> = this.budgetsRepository.find({
      where: {
        userId: info.userId,
      },
    });

    return from(budgetsPromise).pipe(
      mergeMap((entities) => {
        if (entities.some((x) => x.type.name === info.type)) {
          return throwError(
            new RpcException({
              code: 400,
              message: `A budget with type ${info.type} already exists!`,
            }),
          );
        }

        const budgetTypePromise = this.budgetTypesRepository.findOneOrFail({
          where: {
            name: info.type,
          },
        });

        const categories = info.payments.map((x) => x.category);
        const paymentsDetailsPromise = this.paymentDetailsRepository.find({
          where: {
            category: In(categories),
          },
        });

        const promise = Promise.all([
          budgetTypePromise,
          paymentsDetailsPromise,
        ]).then(([type, paymentsDetails]) => {
          const payments: Payment[] = info.payments
            .map(({ value, category, type }) => {
              return {
                value,
                details: paymentsDetails.find(
                  (x) => x.category === category && x.type.name === type,
                ),
              };
            })
            .map((x) => this.paymentsRepository.create(x));

          const { userId } = info;
          const budgetInfo: Partial<Budget> = {
            userId,
            type,
            payments,
          };

          return this.budgetsRepository.save(budgetInfo);
        });

        return from(promise);
      }),
      catchError((err) => {
        console.log(err);

        if (err.error) {
          return throwError(err);
        }

        return throwError(
          new RpcException({
            code: 400,
            message: 'The budget creation failed!',
          }),
        );
      }),
      map((entity) =>
        plainToClass(ShowBudgetDTO, entity, { excludeExtraneousValues: true }),
      ),
    );
  }

  public updateBudget(info: UpdateBudgetDTO): Observable<ShowBudgetDTO> {
    const budgetPromise: Promise<Budget> = this.budgetsRepository.findOneOrFail(
      {
        where: {
          userId: info.userId,
          id: info.budgetId,
        },
      },
    );

    return from(budgetPromise).pipe(
      catchError(() =>
        throwError(
          new RpcException({
            code: 404,
            message: 'The budget was not found!',
          }),
        ),
      ),
      mergeMap((entity) => {
        const changedRelationsPromises: Promise<any>[] = [
          Promise.resolve(entity),
        ];

        if (info.type && entity.type.name !== info.type) {
          const budgetTypePromise = this.budgetTypesRepository.findOneOrFail({
            where: {
              name: info.type,
            },
            relations: ['budgets'],
          });

          changedRelationsPromises.push(budgetTypePromise);
        } else {
          changedRelationsPromises.push(Promise.resolve(null));
        }

        return from(Promise.all(changedRelationsPromises));
      }),
      mergeMap(([entity, budgetType]) => {
        if (budgetType && budgetType.budgets.length > 0) {
          return throwError(
            new RpcException({
              code: 400,
              message: 'A budget with type ${info.type} already exists!',
            }),
          );
        }

        const changedRelationsPromises = [
          Promise.resolve(entity),
          Promise.resolve(budgetType),
        ];
        if (info.payments) {
          const deleteOldPaymentsPromise = this.paymentsRepository.delete(
            entity.payments.map((x) => x.id),
          );

          const categories = info.payments.map((x) => x.category);
          const newPaymentsDetailsPromise = this.paymentDetailsRepository.find({
            where: {
              category: In(categories),
            },
          });

          changedRelationsPromises.push(
            deleteOldPaymentsPromise,
            newPaymentsDetailsPromise,
          );
        } else {
          changedRelationsPromises.push(
            Promise.resolve(null),
            Promise.resolve(null),
          );
        }

        return from(Promise.all(changedRelationsPromises));
      }),
      mergeMap(([entity, budgetTypeEntity, _, newPaymentDetailsEntity]) => {
        const budgetInfo: Partial<Budget> = {
          ...entity,
        };

        if (budgetTypeEntity) {
          budgetInfo.type = budgetTypeEntity;
        }
        if (newPaymentDetailsEntity) {
          const payments: Payment[] = info.payments
            .map(({ value, category, type }) => {
              return {
                value,
                details: newPaymentDetailsEntity.find(
                  (x) => x.category === category && x.type.name === type,
                ),
              };
            })
            .map((x) => this.paymentsRepository.create(x));

          budgetInfo.payments = payments;
        }

        return from(this.budgetsRepository.save(budgetInfo));
      }),
      catchError((err) => {
        if (err.error) {
          return throwError(err);
        }

        return throwError(
          new RpcException({
            code: 400,
            message: 'The budget update failed!',
          }),
        );
      }),
      map((entity) => {
        console.log(entity);

        return plainToClass(ShowBudgetDTO, entity, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }

  public deleteBudget(info: BudgetInfoDTO): Observable<ShowBudgetDTO> {
    const budgetPromise: Promise<Budget> = this.budgetsRepository.findOneOrFail(
      {
        where: {
          userId: info.userId,
          id: info.budgetId,
        },
      },
    );

    return from(budgetPromise).pipe(
      catchError((err) => {
        console.log(err);

        return throwError(
          new RpcException({
            code: 404,
            message: 'The budget was not found!',
          }),
        );
      }),
      mergeMap((entity) => {
        const promise = this.budgetsRepository
          .delete(entity.id)
          .then(() => entity);

        return from(promise);
      }),
      catchError((err) => {
        console.log(err);

        if (err.error) {
          return throwError(err);
        }

        return throwError(
          new RpcException({
            code: 400,
            message: 'The budget delete failed!',
          }),
        );
      }),
      map((entity) => {
        return plainToClass(ShowBudgetDTO, entity, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
