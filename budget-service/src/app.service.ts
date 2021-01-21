import { BudgetType } from './entities/budget-type.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { BudgetInfoDTO } from './dto/budget-info.dto';
import { CreateBudgetDTO } from './dto/create-budget.dto';
import { ShowBudgetDTO } from './dto/show-budget.dto';
import { UpdateBudgetDTO } from './dto/update-budget.dto';
import { UserInfoDTO } from './dto/user-info.dto';
import { Budget } from './entities/budget.entity';
import { PaymentDetails } from './entities/payment-details.entity';
import { Payment } from './entities/payment.entity';

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
    return of([new ShowBudgetDTO()]);
  }

  public getBudget(info: BudgetInfoDTO): Observable<ShowBudgetDTO> {
    return of(new ShowBudgetDTO());
  }

  public createBudget(info: CreateBudgetDTO): Observable<ShowBudgetDTO> {
    return of(new ShowBudgetDTO());
  }

  public updateBudget(info: UpdateBudgetDTO): Observable<ShowBudgetDTO> {
    return of(new ShowBudgetDTO());
  }

  public deleteBudget(info: BudgetInfoDTO): Observable<ShowBudgetDTO> {
    return of(new ShowBudgetDTO());
  }
}
