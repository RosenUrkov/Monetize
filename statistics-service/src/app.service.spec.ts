import 'reflect-metadata';
import { BalancePayload } from './dto/balance-payload.dto';
import { ShowBudgetPaymentDTO } from './dto/show-budget-payment.dto';
import { UserDataDTO } from './dto/user-data.dto';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { AppService } from './app.service';
import { BudgetType } from './common/enums/budget-type.enum';
import { ShowBudgetDTO } from './dto/show-budget.dto';
import { UserInfoDTO } from './dto/user-info.dto';
import { GetStatisticsDTO } from './dto/get-statistics-dto';
import { ShowPaymentDTO } from './dto/show-payment.dto';
import { BudgetPayload } from './dto/budget-payload.dto';

jest.mock('redis', () => {
  return {
    createClient: jest.fn().mockImplementation(() => {
      return {
        get: jest.fn(),
        set: jest.fn(),
      };
    }),
  };
});

const mockGet = jest.fn();
const mockSet = jest.fn();
const bind = jest.fn();

jest.mock('util', () => {
  return {
    promisify: jest.fn().mockImplementation(() => {
      return {
        bind,
      };
    }),
  };
});

describe('App Service Tests', () => {
  let sut: AppService;

  let configService: any;

  beforeEach(async () => {
    bind
      .mockImplementationOnce(() => mockGet)
      .mockImplementationOnce(() => mockSet);

    configService = {
      get() {
        /* empty */
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    sut = module.get<AppService>(AppService);
  });

  it('Sanity check', () => {
    expect(sut).toBeDefined();
  });

  describe('getStatistics()', () => {
    it('should call getAsync once with correct user id', async () => {
      // arrange
      const fakeData = new GetStatisticsDTO();
      fakeData.userId = 15;
      fakeData.startDate = '2020-10-21';
      fakeData.budgetType = BudgetType.Day;

      const budgetPayment: ShowBudgetPaymentDTO = {
        value: '30.00',
        type: 'Expense',
        category: 'Drink',
      };

      const budget: ShowBudgetDTO = {
        id: 20,
        type: 'Day',
        payments: [budgetPayment],
      };

      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-21',
        value: '22.00',
      };

      const userData: UserDataDTO = {
        budgets: [budget],
        payments: [payment],
      };

      const userDataString = JSON.stringify(userData);

      mockGet.mockImplementation(() => Promise.resolve(userDataString));
      mockSet.mockImplementation(() => Promise.resolve());

      // act
      const result = await sut.getStatistics(fakeData);

      // assert
      expect(mockGet).toBeCalledWith(fakeData.userId.toString());
      expect(mockGet).toBeCalledTimes(1);

      mockGet.mockRestore();
      mockSet.mockRestore();
    });

    it('should throw if the user does not have payments in the given time period', async () => {
      // arrange
      const fakeData = new GetStatisticsDTO();
      fakeData.userId = 15;
      fakeData.startDate = '2020-10-21';
      fakeData.budgetType = BudgetType.Day;

      const budgetPayment: ShowBudgetPaymentDTO = {
        value: '30.00',
        type: 'Expense',
        category: 'Drink',
      };

      const budget: ShowBudgetDTO = {
        id: 20,
        type: 'Day',
        payments: [budgetPayment],
      };

      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-20',
        value: '22.00',
      };

      const userData: UserDataDTO = {
        budgets: [budget],
        payments: [payment],
      };

      const userDataString = JSON.stringify(userData);

      mockGet.mockImplementation(() => Promise.resolve(userDataString));
      mockSet.mockImplementation(() => Promise.resolve());

      // act assert
      expect(() => sut.getStatistics(fakeData)).rejects.toThrowError();

      mockGet.mockRestore();
      mockSet.mockRestore();
    });

    it('should throw if the user does not have budget of this type yet', async () => {
      // arrange
      const fakeData = new GetStatisticsDTO();
      fakeData.userId = 15;
      fakeData.startDate = '2020-10-21';
      fakeData.budgetType = BudgetType.Day;

      const budgetPayment: ShowBudgetPaymentDTO = {
        value: '30.00',
        type: 'Expense',
        category: 'Drink',
      };

      const budget: ShowBudgetDTO = {
        id: 20,
        type: 'Month',
        payments: [budgetPayment],
      };

      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-21',
        value: '22.00',
      };

      const userData: UserDataDTO = {
        budgets: [budget],
        payments: [payment],
      };

      const userDataString = JSON.stringify(userData);

      mockGet.mockImplementation(() => Promise.resolve(userDataString));
      mockSet.mockImplementation(() => Promise.resolve());

      // act assert
      expect(() => sut.getStatistics(fakeData)).rejects.toThrowError();

      mockGet.mockRestore();
      mockSet.mockRestore();
    });

    it('should return the accumulated results for payments and payments to budget for the period', async () => {
      // arrange
      const fakeData = new GetStatisticsDTO();
      fakeData.userId = 15;
      fakeData.startDate = '2020-10-21';
      fakeData.budgetType = BudgetType.Day;

      const budgetPayment: ShowBudgetPaymentDTO = {
        value: '30.00',
        type: 'Expense',
        category: 'Drink',
      };

      const budget: ShowBudgetDTO = {
        id: 20,
        type: 'Day',
        payments: [budgetPayment],
      };

      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-21',
        value: '22.00',
      };

      const userData: UserDataDTO = {
        budgets: [budget],
        payments: [payment],
      };

      const userDataString = JSON.stringify(userData);

      mockGet.mockImplementation(() => Promise.resolve(userDataString));
      mockSet.mockImplementation(() => Promise.resolve());

      // act
      const result = await sut.getStatistics(fakeData);

      // assert
      expect(result).toEqual({
        paymentsOfDate: [payment],
        paymentsToBudgetDifference: [
          {
            category: 'Drink',
            type: 'Expense',
            value: '8',
          },
        ],
      });

      mockGet.mockRestore();
      mockSet.mockRestore();
    });
  });

  describe('handleBalanceChange()', () => {
    it('should call getAsync once with correct user id', async () => {
      // arrange
      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-21',
        value: '22.00',
      };

      const fakeData = new BalancePayload();
      fakeData.userId = 15;
      fakeData.payments = [payment];

      const budgetPayment: ShowBudgetPaymentDTO = {
        value: '30.00',
        type: 'Expense',
        category: 'Drink',
      };

      const budget: ShowBudgetDTO = {
        id: 20,
        type: 'Day',
        payments: [budgetPayment],
      };

      const userData: UserDataDTO = {
        budgets: [budget],
        payments: [],
      };

      const userDataString = JSON.stringify(userData);

      mockGet.mockImplementation(() => Promise.resolve(userDataString));
      mockSet.mockImplementation(() => Promise.resolve());

      // act
      const result = await sut.handleBalanceChange(fakeData);

      // assert
      expect(mockGet).toBeCalledWith(fakeData.userId.toString());
      expect(mockGet).toBeCalledTimes(1);

      mockGet.mockRestore();
      mockSet.mockRestore();
    });

    it('should call setAsync once with new user data if there is no present already', async () => {
      // arrange
      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-21',
        value: '22.00',
      };

      const fakeData = new BalancePayload();
      fakeData.userId = 15;
      fakeData.payments = [payment];

      mockGet.mockImplementation(() => Promise.resolve(null));
      mockSet.mockImplementation(() => Promise.resolve());

      // act
      const result = await sut.handleBalanceChange(fakeData);

      // assert
      expect(mockSet).toBeCalledWith(
        fakeData.userId.toString(),
        JSON.stringify({ payments: fakeData.payments, budgets: [] }),
      );
      expect(mockSet).toBeCalledTimes(1);

      mockGet.mockRestore();
      mockSet.mockRestore();
    });

    it('should call setAsync once with updated user data if there is present already', async () => {
      // arrange
      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-21',
        value: '22.00',
      };

      const fakeData = new BalancePayload();
      fakeData.userId = 15;
      fakeData.payments = [payment];

      const budgetPayment: ShowBudgetPaymentDTO = {
        value: '30.00',
        type: 'Expense',
        category: 'Drink',
      };

      const budget: ShowBudgetDTO = {
        id: 20,
        type: 'Day',
        payments: [budgetPayment],
      };

      const userData: UserDataDTO = {
        budgets: [budget],
        payments: [],
      };

      const userDataString = JSON.stringify(userData);

      mockGet.mockImplementation(() => Promise.resolve(userDataString));
      mockSet.mockImplementation(() => Promise.resolve());

      // act
      const result = await sut.handleBalanceChange(fakeData);

      // assert
      expect(mockSet).toBeCalledWith(
        fakeData.userId.toString(),
        JSON.stringify({ budgets: [budget], payments: fakeData.payments }),
      );
      expect(mockSet).toBeCalledTimes(1);

      mockGet.mockRestore();
      mockSet.mockRestore();
    });
  });

  describe('handleBudgetChange()', () => {
    it('should call getAsync once with correct user id', async () => {
      // arrange
      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-21',
        value: '22.00',
      };

      const budgetPayment: ShowBudgetPaymentDTO = {
        value: '30.00',
        type: 'Expense',
        category: 'Drink',
      };

      const budget: ShowBudgetDTO = {
        id: 20,
        type: 'Day',
        payments: [budgetPayment],
      };

      const fakeData = new BudgetPayload();
      fakeData.userId = 15;
      fakeData.budgets = [budget];

      const userData: UserDataDTO = {
        budgets: [],
        payments: [payment],
      };

      const userDataString = JSON.stringify(userData);

      mockGet.mockImplementation(() => Promise.resolve(userDataString));
      mockSet.mockImplementation(() => Promise.resolve());

      // act
      const result = await sut.handleBudgetChange(fakeData);

      // assert
      expect(mockGet).toBeCalledWith(fakeData.userId.toString());
      expect(mockGet).toBeCalledTimes(1);

      mockGet.mockRestore();
      mockSet.mockRestore();
    });

    it('should call setAsync once with new user data if there is no present already', async () => {
      // arrange
      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-21',
        value: '22.00',
      };

      const budgetPayment: ShowBudgetPaymentDTO = {
        value: '30.00',
        type: 'Expense',
        category: 'Drink',
      };

      const budget: ShowBudgetDTO = {
        id: 20,
        type: 'Day',
        payments: [budgetPayment],
      };

      const fakeData = new BudgetPayload();
      fakeData.userId = 15;
      fakeData.budgets = [budget];

      mockGet.mockImplementation(() => Promise.resolve(null));
      mockSet.mockImplementation(() => Promise.resolve());

      // act
      const result = await sut.handleBudgetChange(fakeData);

      // assert
      expect(mockSet).toBeCalledWith(
        fakeData.userId.toString(),
        JSON.stringify({ payments: [], budgets: fakeData.budgets }),
      );
      expect(mockSet).toBeCalledTimes(1);

      mockGet.mockRestore();
      mockSet.mockRestore();
    });

    it('should call setAsync once with updated user data if there is present already', async () => {
      // arrange
      const payment: ShowPaymentDTO = {
        id: 1,
        account: 'Bank',
        category: 'Drink',
        type: 'Expense',
        date: '2020-10-21',
        value: '22.00',
      };

      const budgetPayment: ShowBudgetPaymentDTO = {
        value: '30.00',
        type: 'Expense',
        category: 'Drink',
      };

      const budget: ShowBudgetDTO = {
        id: 20,
        type: 'Day',
        payments: [budgetPayment],
      };

      const fakeData = new BudgetPayload();
      fakeData.userId = 15;
      fakeData.budgets = [budget];

      const userData: UserDataDTO = {
        budgets: [],
        payments: [payment],
      };

      const userDataString = JSON.stringify(userData);

      mockGet.mockImplementation(() => Promise.resolve(userDataString));
      mockSet.mockImplementation(() => Promise.resolve());

      // act
      const result = await sut.handleBudgetChange(fakeData);

      // assert
      expect(mockSet).toBeCalledWith(
        fakeData.userId.toString(),
        JSON.stringify({ budgets: fakeData.budgets, payments: [payment] }),
      );
      expect(mockSet).toBeCalledTimes(1);

      mockGet.mockRestore();
      mockSet.mockRestore();
    });
  });

  describe('handleDeleteData()', () => {
    it('should call setAsync once with correct user id and stringified null', async () => {
      // arrange

      const fakeData = new UserInfoDTO();
      fakeData.userId = 15;

      mockGet.mockImplementation(() => Promise.resolve());
      mockSet.mockImplementation(() => Promise.resolve());

      // act
      const result = await sut.handleDeleteData(fakeData);

      // assert
      expect(mockSet).toBeCalledWith(
        fakeData.userId.toString(),
        JSON.stringify(null),
      );
      expect(mockSet).toBeCalledTimes(1);

      mockGet.mockRestore();
      mockSet.mockRestore();
    });
  });
});
