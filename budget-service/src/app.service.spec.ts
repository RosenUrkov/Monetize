import { BudgetInfoDTO } from './dto/budget-info.dto';
import 'reflect-metadata';
import { ShowBudgetDTO } from './dto/show-budget.dto';
import { BudgetType } from './entities/budget-type.entity';
import { Budget } from './entities/budget.entity';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { UserInfoDTO } from './dto/user-info.dto';
import { PaymentDetails } from './entities/payment-details.entity';
import { Payment } from './entities/payment.entity';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShowPaymentDTO } from './dto/show-payment.dto';
import { plainToClass } from 'class-transformer';
import { PaymentType } from './common/enums/payment-type.enum';
import { ExpenseCategory } from './common/enums/expense-category';
import { CreateBudgetDTO } from './dto/create-budget.dto';
import { BudgetType as BudgetTypeEnum } from './common/enums/budget-type.enum';
import { In } from 'typeorm';
import { IncomeCategory } from './common/enums/income-category.enum';

describe('App Service Tests', () => {
  let sut: AppService;

  let budgetsRepo: any;
  let budgetTypesRepo: any;
  let paymentsRepo: any;
  let paymentDetailsRepo: any;

  beforeEach(async () => {
    budgetsRepo = {
      find() {
        /* empty */
      },
      findOne() {
        /* empty */
      },
      delete() {
        /* empty */
      },
      save() {
        /* empty */
      },
    };

    budgetTypesRepo = {
      findOne() {
        /* empty */
      },
    };

    paymentsRepo = {
      create() {
        /* empty */
      },
      delete() {
        /* empty */
      },
    };

    paymentDetailsRepo = {
      find() {
        /* empty */
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: getRepositoryToken(Budget), useValue: budgetsRepo },
        { provide: getRepositoryToken(BudgetType), useValue: budgetTypesRepo },
        { provide: getRepositoryToken(Payment), useValue: paymentsRepo },
        {
          provide: getRepositoryToken(PaymentDetails),
          useValue: paymentDetailsRepo,
        },
      ],
    }).compile();

    sut = module.get<AppService>(AppService);
  });

  it('Sanity check', () => {
    expect(sut).toBeDefined();
  });

  describe('getBudgets()', () => {
    it('should call budgetsRepo.find() once with correct user id', async () => {
      // arrange
      const fakeUser = new UserInfoDTO();
      fakeUser.userId = 15;

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgets: Budget[] = [budget];
      const transformedBudgets = plainToClass(ShowBudgetDTO, budgets, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve(budgets));

      // act
      const result = await sut.getBudgets(fakeUser);

      // assert
      expect(spy).toBeCalledWith({ where: { userId: fakeUser.userId } });
      expect(spy).toBeCalledTimes(1);
    });

    it('should return the budgets transformed to ShowBudgetDTO', async () => {
      // arrange
      const fakeUser = new UserInfoDTO();
      fakeUser.userId = 15;

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgets: Budget[] = [budget];
      const transformedBudgets = plainToClass(ShowBudgetDTO, budgets, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve(budgets));

      // act
      const result = await sut.getBudgets(fakeUser);

      // assert
      expect(result).toEqual(transformedBudgets);
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBeInstanceOf(ShowBudgetDTO);
    });
  });

  describe('getBudget()', () => {
    it('should call budgetsRepo.findOne() once with correct user id and budget id', async () => {
      // arrange
      const fakeInfo = new BudgetInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.budgetId = 3;

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(budgetsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.getBudget(fakeInfo);

      // assert
      expect(spy).toBeCalledWith({
        where: { userId: fakeInfo.userId, id: fakeInfo.budgetId },
      });
      expect(spy).toBeCalledTimes(1);
    });

    it('should throw if the budget is not found', async () => {
      // arrange
      const fakeInfo = new BudgetInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.budgetId = 3;

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(budgetsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      // act assert
      expect(() => sut.getBudget(fakeInfo)).rejects.toThrowError();
    });

    it('should return the searched budget transformed to ShowBudgetDTO', async () => {
      // arrange
      const fakeInfo = new BudgetInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.budgetId = 3;

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(budgetsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.getBudget(fakeInfo);

      // assert
      expect(result).toEqual(transformedBudget);
      expect(result).toBeInstanceOf(ShowBudgetDTO);
    });
  });

  describe('createBudget()', () => {
    it('should call budgetsRepo.find() once with correct user id', async () => {
      // arrange
      const fakePayment: CreatePaymentDTO = {
        value: '20',
        type: PaymentType.Expense,
        category: ExpenseCategory.Cloathing,
      };

      const fakeInfo = new CreateBudgetDTO();
      fakeInfo.userId = 15;
      fakeInfo.type = BudgetTypeEnum.Month;
      fakeInfo.payments = [fakePayment];

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgetType = new BudgetType();
      const paymentDetails = new PaymentDetails();
      paymentDetails.category = ExpenseCategory.Cloathing;
      paymentDetails.type = {
        id: 3,
        name: 'Expense',
        details: [],
      };
      const payment = new Payment();

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findBudgetsSpy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve([budget]));

      const findOneBudgetTypeSpy = jest
        .spyOn(budgetTypesRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budgetType));

      const findPaymentDetailsSpy = jest
        .spyOn(paymentDetailsRepo, 'find')
        .mockReturnValue(Promise.resolve([paymentDetails]));

      const createPaymentSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(payment);

      const saveBudgetSpy = jest
        .spyOn(budgetsRepo, 'save')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.createBudget(fakeInfo);

      // assert
      expect(findBudgetsSpy).toBeCalledWith({
        where: { userId: fakeInfo.userId },
      });
      expect(findBudgetsSpy).toBeCalledTimes(1);
    });

    it('should throw if the budget type already exist', async () => {
      // arrange
      const fakePayment: CreatePaymentDTO = {
        value: '20',
        type: PaymentType.Expense,
        category: ExpenseCategory.Cloathing,
      };

      const fakeInfo = new CreateBudgetDTO();
      fakeInfo.userId = 15;
      fakeInfo.type = BudgetTypeEnum.Day;
      fakeInfo.payments = [fakePayment];

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgetType = new BudgetType();
      const paymentDetails = new PaymentDetails();
      paymentDetails.category = ExpenseCategory.Cloathing;
      paymentDetails.type = {
        id: 3,
        name: 'Expense',
        details: [],
      };
      const payment = new Payment();

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findBudgetsSpy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve([budget]));

      const findOneBudgetTypeSpy = jest
        .spyOn(budgetTypesRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budgetType));

      const findPaymentDetailsSpy = jest
        .spyOn(paymentDetailsRepo, 'find')
        .mockReturnValue(Promise.resolve([paymentDetails]));

      const createPaymentSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(payment);

      const saveBudgetSpy = jest
        .spyOn(budgetsRepo, 'save')
        .mockReturnValue(Promise.resolve(budget));

      // act assert
      expect(() => sut.createBudget(fakeInfo)).rejects.toThrowError();
    });

    it('should call budgetTypeRepo.findOne() once with correct info type', async () => {
      // arrange
      const fakePayment: CreatePaymentDTO = {
        value: '20',
        type: PaymentType.Expense,
        category: ExpenseCategory.Cloathing,
      };

      const fakeInfo = new CreateBudgetDTO();
      fakeInfo.userId = 15;
      fakeInfo.type = BudgetTypeEnum.Month;
      fakeInfo.payments = [fakePayment];

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgetType = new BudgetType();
      const paymentDetails = new PaymentDetails();
      paymentDetails.category = ExpenseCategory.Cloathing;
      paymentDetails.type = {
        id: 3,
        name: 'Expense',
        details: [],
      };
      const payment = new Payment();

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findBudgetsSpy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve([budget]));

      const findOneBudgetTypeSpy = jest
        .spyOn(budgetTypesRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budgetType));

      const findPaymentDetailsSpy = jest
        .spyOn(paymentDetailsRepo, 'find')
        .mockReturnValue(Promise.resolve([paymentDetails]));

      const createPaymentSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(payment);

      const saveBudgetSpy = jest
        .spyOn(budgetsRepo, 'save')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.createBudget(fakeInfo);

      // assert
      expect(findOneBudgetTypeSpy).toBeCalledWith({
        where: { name: fakeInfo.type },
      });
      expect(findOneBudgetTypeSpy).toBeCalledTimes(1);
    });

    it('should call paymentDetailsRepo.find() once with correct category', async () => {
      // arrange
      const fakePayment: CreatePaymentDTO = {
        value: '20',
        type: PaymentType.Expense,
        category: ExpenseCategory.Cloathing,
      };

      const fakeInfo = new CreateBudgetDTO();
      fakeInfo.userId = 15;
      fakeInfo.type = BudgetTypeEnum.Month;
      fakeInfo.payments = [fakePayment];

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgetType = new BudgetType();
      const paymentDetails = new PaymentDetails();
      paymentDetails.category = ExpenseCategory.Cloathing;
      paymentDetails.type = {
        id: 3,
        name: 'Expense',
        details: [],
      };
      const payment = new Payment();

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findBudgetsSpy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve([budget]));

      const findOneBudgetTypeSpy = jest
        .spyOn(budgetTypesRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budgetType));

      const findPaymentDetailsSpy = jest
        .spyOn(paymentDetailsRepo, 'find')
        .mockReturnValue(Promise.resolve([paymentDetails]));

      const createPaymentSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(payment);

      const saveBudgetSpy = jest
        .spyOn(budgetsRepo, 'save')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.createBudget(fakeInfo);

      // assert
      expect(findPaymentDetailsSpy).toBeCalledWith({
        where: { category: In([fakeInfo.payments[0].category]) },
      });
      expect(findPaymentDetailsSpy).toBeCalledTimes(1);
    });

    it('should throw if the passed budget type does not exist', async () => {
      // arrange
      const fakePayment: CreatePaymentDTO = {
        value: '20',
        type: PaymentType.Expense,
        category: ExpenseCategory.Cloathing,
      };

      const fakeInfo = new CreateBudgetDTO();
      fakeInfo.userId = 15;
      fakeInfo.type = BudgetTypeEnum.Month;
      fakeInfo.payments = [fakePayment];

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgetType = new BudgetType();
      const paymentDetails = new PaymentDetails();
      paymentDetails.category = ExpenseCategory.Cloathing;
      paymentDetails.type = {
        id: 3,
        name: 'Expense',
        details: [],
      };
      const payment = new Payment();

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findBudgetsSpy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve([budget]));

      const findOneBudgetTypeSpy = jest
        .spyOn(budgetTypesRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      const findPaymentDetailsSpy = jest
        .spyOn(paymentDetailsRepo, 'find')
        .mockReturnValue(Promise.resolve([paymentDetails]));

      const createPaymentSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(payment);

      const saveBudgetSpy = jest
        .spyOn(budgetsRepo, 'save')
        .mockReturnValue(Promise.resolve(budget));

      // act assert
      expect(() => sut.createBudget(fakeInfo)).rejects.toThrowError();
    });

    it('should throw if there is payment with invalid type or category', async () => {
      // arrange
      const fakePayment: CreatePaymentDTO = {
        value: '20',
        type: PaymentType.Income,
        category: IncomeCategory.Investment,
      };

      const fakeInfo = new CreateBudgetDTO();
      fakeInfo.userId = 15;
      fakeInfo.type = BudgetTypeEnum.Month;
      fakeInfo.payments = [fakePayment];

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgetType = new BudgetType();
      const paymentDetails = new PaymentDetails();
      paymentDetails.category = ExpenseCategory.Cloathing;
      paymentDetails.type = {
        id: 3,
        name: 'Expense',
        details: [],
      };
      const payment = new Payment();

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findBudgetsSpy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve([budget]));

      const findOneBudgetTypeSpy = jest
        .spyOn(budgetTypesRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budgetType));

      const findPaymentDetailsSpy = jest
        .spyOn(paymentDetailsRepo, 'find')
        .mockReturnValue(Promise.resolve([paymentDetails]));

      const createPaymentSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(payment);

      const saveBudgetSpy = jest
        .spyOn(budgetsRepo, 'save')
        .mockReturnValue(Promise.resolve(budget));

      // act assert
      expect(() => sut.createBudget(fakeInfo)).rejects.toThrowError();
    });

    it('should call paymentsRepo.create() once with correct data', async () => {
      // arrange
      const fakePayment: CreatePaymentDTO = {
        value: '20',
        type: PaymentType.Expense,
        category: ExpenseCategory.Cloathing,
      };

      const fakeInfo = new CreateBudgetDTO();
      fakeInfo.userId = 15;
      fakeInfo.type = BudgetTypeEnum.Month;
      fakeInfo.payments = [fakePayment];

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgetType = new BudgetType();
      const paymentDetails = new PaymentDetails();
      paymentDetails.category = ExpenseCategory.Cloathing;
      paymentDetails.type = {
        id: 3,
        name: 'Expense',
        details: [],
      };
      const payment = new Payment();

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findBudgetsSpy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve([budget]));

      const findOneBudgetTypeSpy = jest
        .spyOn(budgetTypesRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budgetType));

      const findPaymentDetailsSpy = jest
        .spyOn(paymentDetailsRepo, 'find')
        .mockReturnValue(Promise.resolve([paymentDetails]));

      const createPaymentSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(payment);

      const saveBudgetSpy = jest
        .spyOn(budgetsRepo, 'save')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.createBudget(fakeInfo);

      // assert
      expect(createPaymentSpy).toBeCalledWith({
        value: fakePayment.value,
        details: paymentDetails,
      });
      expect(createPaymentSpy).toBeCalledTimes(1);
    });

    it('should call budgetsRepo.save() once with correct budget info', async () => {
      // arrange
      const fakePayment: CreatePaymentDTO = {
        value: '20',
        type: PaymentType.Expense,
        category: ExpenseCategory.Cloathing,
      };

      const fakeInfo = new CreateBudgetDTO();
      fakeInfo.userId = 15;
      fakeInfo.type = BudgetTypeEnum.Month;
      fakeInfo.payments = [fakePayment];

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgetType = new BudgetType();
      const paymentDetails = new PaymentDetails();
      paymentDetails.category = ExpenseCategory.Cloathing;
      paymentDetails.type = {
        id: 3,
        name: 'Expense',
        details: [],
      };
      const payment = new Payment();

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findBudgetsSpy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve([budget]));

      const findOneBudgetTypeSpy = jest
        .spyOn(budgetTypesRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budgetType));

      const findPaymentDetailsSpy = jest
        .spyOn(paymentDetailsRepo, 'find')
        .mockReturnValue(Promise.resolve([paymentDetails]));

      const createPaymentSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(payment);

      const saveBudgetSpy = jest
        .spyOn(budgetsRepo, 'save')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.createBudget(fakeInfo);

      // assert
      const budgetToCreate = {
        userId: fakeInfo.userId,
        type: budgetType,
        payments: [payment],
      };

      expect(saveBudgetSpy).toBeCalledWith(budgetToCreate);
      expect(saveBudgetSpy).toBeCalledTimes(1);
    });

    it('should return the created budget transformed to ShowBudgetDTO', async () => {
      // arrange
      const fakePayment: CreatePaymentDTO = {
        value: '20',
        type: PaymentType.Expense,
        category: ExpenseCategory.Cloathing,
      };

      const fakeInfo = new CreateBudgetDTO();
      fakeInfo.userId = 15;
      fakeInfo.type = BudgetTypeEnum.Month;
      fakeInfo.payments = [fakePayment];

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const budgetType = new BudgetType();
      const paymentDetails = new PaymentDetails();
      paymentDetails.category = ExpenseCategory.Cloathing;
      paymentDetails.type = {
        id: 3,
        name: 'Expense',
        details: [],
      };
      const payment = new Payment();

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findBudgetsSpy = jest
        .spyOn(budgetsRepo, 'find')
        .mockReturnValue(Promise.resolve([budget]));

      const findOneBudgetTypeSpy = jest
        .spyOn(budgetTypesRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budgetType));

      const findPaymentDetailsSpy = jest
        .spyOn(paymentDetailsRepo, 'find')
        .mockReturnValue(Promise.resolve([paymentDetails]));

      const createPaymentSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(payment);

      const saveBudgetSpy = jest
        .spyOn(budgetsRepo, 'save')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.createBudget(fakeInfo);

      // assert
      const budgetToCreate = {
        userId: fakeInfo.userId,
        type: budgetType,
        payments: [payment],
      };

      expect(result).toEqual(transformedBudget);
      expect(result).toBeInstanceOf(ShowBudgetDTO);
    });
  });

  describe('deleteBudget()', () => {
    it('should call budgetsRepo.findOne() once with correct user id and budget id', async () => {
      // arrange
      const fakeInfo = new BudgetInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.budgetId = 3;

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findOneSpy = jest
        .spyOn(budgetsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budget));

      const deleteSpy = jest
        .spyOn(budgetsRepo, 'delete')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.deleteBudget(fakeInfo);

      // assert
      expect(findOneSpy).toBeCalledWith({
        where: { userId: fakeInfo.userId, id: fakeInfo.budgetId },
      });
      expect(findOneSpy).toBeCalledTimes(1);
    });

    it('should throw if the budget is not found', async () => {
      // arrange
      const fakeInfo = new BudgetInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.budgetId = 3;

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findOneSpy = jest
        .spyOn(budgetsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budget));

      const deleteSpy = jest
        .spyOn(budgetsRepo, 'delete')
        .mockReturnValue(Promise.resolve(budget));

      // act assert
      expect(() => sut.deleteBudget(fakeInfo)).rejects.toThrowError();
    });

    it('should call budgetsRepo.delete() once with correct budget id', async () => {
      // arrange
      const fakeInfo = new BudgetInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.budgetId = 3;

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findOneSpy = jest
        .spyOn(budgetsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budget));

      const deleteSpy = jest
        .spyOn(budgetsRepo, 'delete')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.deleteBudget(fakeInfo);

      // assert
      expect(deleteSpy).toBeCalledWith(budget.id);
      expect(deleteSpy).toBeCalledTimes(1);
    });

    it('should return the deleted budget transformed to ShowBudgetDTO', async () => {
      // arrange
      const fakeInfo = new BudgetInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.budgetId = 3;

      const budget: Budget = {
        id: 20,
        userId: 10,
        type: {
          id: 1,
          name: 'Day',
          budgets: [],
        },
        payments: [],
      };

      const transformedBudget = plainToClass(ShowBudgetDTO, budget, {
        excludeExtraneousValues: true,
      });

      const findOneSpy = jest
        .spyOn(budgetsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(budget));

      const deleteSpy = jest
        .spyOn(budgetsRepo, 'delete')
        .mockReturnValue(Promise.resolve(budget));

      // act
      const result = await sut.deleteBudget(fakeInfo);

      // assert
      expect(result).toEqual(transformedBudget);
      expect(result).toBeInstanceOf(ShowBudgetDTO);
    });
  });
});
