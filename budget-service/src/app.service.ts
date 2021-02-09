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

  public async getBudgets(info: UserInfoDTO): Promise<ShowBudgetDTO[]> {
    const budgets: Budget[] = await this.budgetsRepository.find({
      where: {
        userId: info.userId,
      },
    });

    return plainToClass(ShowBudgetDTO, budgets, {
      excludeExtraneousValues: true,
    });
  }

  public async getBudget(info: BudgetInfoDTO): Promise<ShowBudgetDTO> {
    const budget: Budget = await this.budgetsRepository.findOne({
      where: {
        userId: info.userId,
        id: info.budgetId,
      },
    });

    if (!budget) {
      throw new RpcException({
        code: 404,
        message: 'The budget was not found!',
      });
    }

    return plainToClass(ShowBudgetDTO, budget, {
      excludeExtraneousValues: true,
    });
  }

  public async createBudget(info: CreateBudgetDTO): Promise<ShowBudgetDTO> {
    const budgets: Budget[] = await this.budgetsRepository.find({
      where: {
        userId: info.userId,
      },
    });

    if (budgets.some((x) => x.type.name === info.type)) {
      throw new RpcException({
        code: 400,
        message: `A budget with type ${info.type} already exists!`,
      });
    }

    const budgetTypePromise = this.budgetTypesRepository.findOne({
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

    const [type, paymentsDetails] = await Promise.all([
      budgetTypePromise,
      paymentsDetailsPromise,
    ]);

    if (!type) {
      throw new RpcException({
        code: 400,
        message: `The passed budget type does not exist!`,
      });
    }

    const payments: Payment[] = info.payments
      .map(({ value, category, type }) => {
        const details = paymentsDetails.find(
          (x) => x.category === category && x.type.name === type,
        );

        if (!details) {
          throw new RpcException({
            code: 400,
            message: `There is a payment with invalid category or type!`,
          });
        }

        return {
          value,
          details,
        };
      })
      .map((x) => this.paymentsRepository.create(x));

    const { userId } = info;
    const budgetInfo: Partial<Budget> = {
      userId,
      type,
      payments,
    };

    const savedBudget = await this.budgetsRepository.save(budgetInfo);

    return plainToClass(ShowBudgetDTO, savedBudget, {
      excludeExtraneousValues: true,
    });
  }

  public async updateBudget(info: UpdateBudgetDTO): Promise<ShowBudgetDTO> {
    const budget: Budget = await this.budgetsRepository.findOne({
      where: {
        userId: info.userId,
        id: info.budgetId,
      },
    });

    if (!budget) {
      throw new RpcException({
        code: 404,
        message: 'The budget was not found!',
      });
    }

    let budgetType = null;
    if (info.type && budget.type.name !== info.type) {
      budgetType = await this.budgetTypesRepository.findOne({
        where: {
          name: info.type,
        },
        relations: ['budgets'],
      });
    }
    if (budgetType && budgetType.budgets.length > 0) {
      throw new RpcException({
        code: 400,
        message: `A budget with type ${info.type} already exists!`,
      });
    }

    const changedRelationsPromises: Promise<any>[] = [];
    if (info.payments?.length) {
      const deleteOldPaymentsPromise = budget.payments?.length
        ? this.paymentsRepository.delete(budget.payments.map((x) => x.id))
        : Promise.resolve(null);

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

    const [_, newPaymentDetailsEntity] = await Promise.all(
      changedRelationsPromises,
    );

    const budgetInfo: Partial<Budget> = {
      ...budget,
    };

    if (budgetType) {
      budgetInfo.type = budgetType;
    }
    if (newPaymentDetailsEntity) {
      const payments: Payment[] = info.payments
        .map(({ value, category, type }) => {
          const details = newPaymentDetailsEntity.find(
            (x) => x.category === category && x.type.name === type,
          );

          if (!details) {
            throw new RpcException({
              code: 400,
              message: `There is a payment with invalid category or type!`,
            });
          }

          return {
            value,
            details,
          };
        })
        .map((x) => this.paymentsRepository.create(x));

      budgetInfo.payments = payments;
    }

    const updatedBudget = await this.budgetsRepository.save(budgetInfo);

    return plainToClass(ShowBudgetDTO, updatedBudget, {
      excludeExtraneousValues: true,
    });
  }

  public async deleteBudget(info: BudgetInfoDTO): Promise<ShowBudgetDTO> {
    const budget: Budget = await this.budgetsRepository.findOne({
      where: {
        userId: info.userId,
        id: info.budgetId,
      },
    });

    if (!budget) {
      throw new RpcException({
        code: 404,
        message: 'The budget was not found!',
      });
    }

    const deletedBudget = await this.budgetsRepository.delete(budget.id);

    return plainToClass(ShowBudgetDTO, budget, {
      excludeExtraneousValues: true,
    });
  }
}
