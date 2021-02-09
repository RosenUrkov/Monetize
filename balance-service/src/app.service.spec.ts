import { CreatePaymentDTO } from './dto/create-payment.dto';
import { PaymentInfoDTO } from './dto/payment-info.dto';
import { UserInfoDTO } from './dto/user-info.dto';
import { PaymentDetails } from './entities/payment-details.entity';
import { Account } from './entities/account.entity';
import { Payment } from './entities/payment.entity';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShowPaymentDTO } from './dto/show-payment.dto';
import { plainToClass } from 'class-transformer';
import { AccountType } from './common/enums/account-type.enum';
import { PaymentType } from './common/enums/payment-type.enum';
import { ExpenseCategory } from './common/enums/expense-category';

describe('App Service Tests', () => {
  let sut: AppService;

  let paymentsRepo: any;
  let accountsRepo: any;
  let paymentDetailsRepo: any;

  beforeEach(async () => {
    paymentsRepo = {
      find() {
        /* empty */
      },
      findOne() {
        /* empty */
      },
      create() {
        /* empty */
      },
      delete() {
        /* empty */
      },
      save() {
        /* empty */
      },
    };

    accountsRepo = {
      findOne() {
        /* empty */
      },
    };

    paymentDetailsRepo = {
      findOne() {
        /* empty */
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: getRepositoryToken(Payment), useValue: paymentsRepo },
        { provide: getRepositoryToken(Account), useValue: accountsRepo },
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

  describe('getPayments()', () => {
    it('should call paymentsRepo.find() once with correct user id', async () => {
      // arrange
      const fakeUser = new UserInfoDTO();
      fakeUser.userId = 15;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };
      const payments: Payment[] = [payment];
      const transformedPayments = plainToClass(ShowPaymentDTO, payments, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(paymentsRepo, 'find')
        .mockReturnValue(Promise.resolve(payments));

      // act
      const result = await sut.getPayments(fakeUser);

      // assert
      expect(spy).toBeCalledWith({ where: { userId: fakeUser.userId } });
      expect(spy).toBeCalledTimes(1);
    });

    it('should return the payments transformed to ShowPaymentDTO', async () => {
      // arrange
      const fakeUser = new UserInfoDTO();
      fakeUser.userId = 15;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };
      const payments: Payment[] = [payment];
      const transformedPayments = plainToClass(ShowPaymentDTO, payments, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(paymentsRepo, 'find')
        .mockReturnValue(Promise.resolve(payments));

      // act
      const result = await sut.getPayments(fakeUser);

      // assert
      expect(result).toEqual(transformedPayments);
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBeInstanceOf(ShowPaymentDTO);
    });
  });

  describe('getPayment()', () => {
    it('should call paymentsRepo.findOne() once with correct user id and payment id', async () => {
      // arrange
      const fakeInfo = new PaymentInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.paymentId = 3;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(paymentsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.getPayment(fakeInfo);

      // assert
      expect(spy).toBeCalledWith({
        where: { userId: fakeInfo.userId, id: fakeInfo.paymentId },
      });
      expect(spy).toBeCalledTimes(1);
    });

    it('should throw error if there is no such payment with the required id', async () => {
      // arrange
      const fakeInfo = new PaymentInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.paymentId = 3;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(paymentsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      // act assert
      expect(() => sut.getPayment(fakeInfo)).rejects.toThrowError();
    });

    it('should return the found payment', async () => {
      // arrange
      const fakeInfo = new PaymentInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.paymentId = 3;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const spy = jest
        .spyOn(paymentsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.getPayment(fakeInfo);

      // assert
      expect(result).toEqual(transformedPayment);
      expect(result).toBeInstanceOf(ShowPaymentDTO);
    });
  });

  describe('createPayment()', () => {
    it('should call accountsRepo.findOne() once with correct account name', async () => {
      // arrange
      const fakeInfo = new CreatePaymentDTO();
      fakeInfo.userId = 1;
      fakeInfo.value = '12';
      fakeInfo.date = '12/12/12';
      fakeInfo.category = ExpenseCategory.Drink;
      fakeInfo.type = PaymentType.Expense;
      fakeInfo.account = AccountType.Bank;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const account = new Account();
      const details = new PaymentDetails();
      const createdPayment = new Payment();

      const accountsFindOneSpy = jest
        .spyOn(accountsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(account));

      const paymentDetailsFindOneSpy = jest
        .spyOn(paymentDetailsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(details));

      const paymentsCreateSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(createdPayment);

      const paymentsSaveSpy = jest
        .spyOn(paymentsRepo, 'save')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.createPayment(fakeInfo);

      // assert
      expect(accountsFindOneSpy).toBeCalledWith({
        where: { type: fakeInfo.account },
      });
      expect(accountsFindOneSpy).toBeCalledTimes(1);
    });

    it('should call detailsRepo.findOne() once with correct category name', async () => {
      // arrange
      const fakeInfo = new CreatePaymentDTO();
      fakeInfo.userId = 1;
      fakeInfo.value = '12';
      fakeInfo.date = '12/12/12';
      fakeInfo.category = ExpenseCategory.Drink;
      fakeInfo.type = PaymentType.Expense;
      fakeInfo.account = AccountType.Bank;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const account = new Account();
      const details = new PaymentDetails();
      const createdPayment = new Payment();

      const accountsFindOneSpy = jest
        .spyOn(accountsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(account));

      const paymentDetailsFindOneSpy = jest
        .spyOn(paymentDetailsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(details));

      const paymentsCreateSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(createdPayment);

      const paymentsSaveSpy = jest
        .spyOn(paymentsRepo, 'save')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.createPayment(fakeInfo);

      // assert
      expect(paymentDetailsFindOneSpy).toBeCalledWith({
        where: { category: fakeInfo.category },
      });
      expect(paymentDetailsFindOneSpy).toBeCalledTimes(1);
    });

    it('should throw if the details are not found', async () => {
      // arrange
      const fakeInfo = new CreatePaymentDTO();
      fakeInfo.userId = 1;
      fakeInfo.value = '12';
      fakeInfo.date = '12/12/12';
      fakeInfo.category = ExpenseCategory.Drink;
      fakeInfo.type = PaymentType.Expense;
      fakeInfo.account = AccountType.Bank;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const account = new Account();
      const details = new PaymentDetails();
      const createdPayment = new Payment();

      const accountsFindOneSpy = jest
        .spyOn(accountsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(account));

      const paymentDetailsFindOneSpy = jest
        .spyOn(paymentDetailsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      const paymentsCreateSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(createdPayment);

      const paymentsSaveSpy = jest
        .spyOn(paymentsRepo, 'save')
        .mockReturnValue(Promise.resolve(payment));

      // act assert
      expect(() => sut.createPayment(fakeInfo)).rejects.toThrowError();
    });

    it('should throw if the account is not found', async () => {
      // arrange
      const fakeInfo = new CreatePaymentDTO();
      fakeInfo.userId = 1;
      fakeInfo.value = '12';
      fakeInfo.date = '12/12/12';
      fakeInfo.category = ExpenseCategory.Drink;
      fakeInfo.type = PaymentType.Expense;
      fakeInfo.account = AccountType.Bank;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const account = new Account();
      const details = new PaymentDetails();
      const createdPayment = new Payment();

      const accountsFindOneSpy = jest
        .spyOn(accountsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      const paymentDetailsFindOneSpy = jest
        .spyOn(paymentDetailsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(details));

      const paymentsCreateSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(createdPayment);

      const paymentsSaveSpy = jest
        .spyOn(paymentsRepo, 'save')
        .mockReturnValue(Promise.resolve(payment));

      // act assert
      expect(() => sut.createPayment(fakeInfo)).rejects.toThrowError();
    });

    it('should call paymentsRepo.create() once with correct payment info', async () => {
      // arrange
      const fakeInfo = new CreatePaymentDTO();
      fakeInfo.userId = 1;
      fakeInfo.value = '12';
      fakeInfo.date = '12/12/12';
      fakeInfo.category = ExpenseCategory.Drink;
      fakeInfo.type = PaymentType.Expense;
      fakeInfo.account = AccountType.Bank;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const account = new Account();
      const details = new PaymentDetails();
      const createdPayment = new Payment();

      const accountsFindOneSpy = jest
        .spyOn(accountsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(account));

      const paymentDetailsFindOneSpy = jest
        .spyOn(paymentDetailsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(details));

      const paymentsCreateSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(createdPayment);

      const paymentsSaveSpy = jest
        .spyOn(paymentsRepo, 'save')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.createPayment(fakeInfo);

      // assert
      const { userId, date, value } = fakeInfo;
      const createObj = { userId, date, value, account, details };

      expect(paymentsCreateSpy).toBeCalledWith(createObj);
      expect(paymentsCreateSpy).toBeCalledTimes(1);
    });

    it('should call paymentsRepo.save() once with payment info', async () => {
      // arrange
      const fakeInfo = new CreatePaymentDTO();
      fakeInfo.userId = 1;
      fakeInfo.value = '12';
      fakeInfo.date = '12/12/12';
      fakeInfo.category = ExpenseCategory.Drink;
      fakeInfo.type = PaymentType.Expense;
      fakeInfo.account = AccountType.Bank;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const account = new Account();
      const details = new PaymentDetails();
      const createdPayment = new Payment();

      const accountsFindOneSpy = jest
        .spyOn(accountsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(account));

      const paymentDetailsFindOneSpy = jest
        .spyOn(paymentDetailsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(details));

      const paymentsCreateSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(createdPayment);

      const paymentsSaveSpy = jest
        .spyOn(paymentsRepo, 'save')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.createPayment(fakeInfo);

      // assert
      expect(paymentsSaveSpy).toBeCalledWith(createdPayment);
      expect(paymentsSaveSpy).toBeCalledTimes(1);
    });

    it('should return the created payment after transformation to ShowPaymentDTO', async () => {
      // arrange
      const fakeInfo = new CreatePaymentDTO();
      fakeInfo.userId = 1;
      fakeInfo.value = '12';
      fakeInfo.date = '12/12/12';
      fakeInfo.category = ExpenseCategory.Drink;
      fakeInfo.type = PaymentType.Expense;
      fakeInfo.account = AccountType.Bank;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const account = new Account();
      const details = new PaymentDetails();
      const createdPayment = new Payment();

      const accountsFindOneSpy = jest
        .spyOn(accountsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(account));

      const paymentDetailsFindOneSpy = jest
        .spyOn(paymentDetailsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(details));

      const paymentsCreateSpy = jest
        .spyOn(paymentsRepo, 'create')
        .mockReturnValue(createdPayment);

      const paymentsSaveSpy = jest
        .spyOn(paymentsRepo, 'save')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.createPayment(fakeInfo);

      // assert
      expect(result).toEqual(transformedPayment);
      expect(result).toBeInstanceOf(ShowPaymentDTO);
    });
  });

  describe('deletePayment()', () => {
    it('should call paymentsRepo.findOne() once with correct user id and payment id', async () => {
      // arrange
      const fakeInfo = new PaymentInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.paymentId = 3;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const findOneSpy = jest
        .spyOn(paymentsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(payment));

      const deleteSpy = jest
        .spyOn(paymentsRepo, 'delete')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.deletePayment(fakeInfo);

      // assert
      expect(findOneSpy).toBeCalledWith({
        where: { userId: fakeInfo.userId, id: fakeInfo.paymentId },
      });
      expect(findOneSpy).toBeCalledTimes(1);
    });

    it('should throw error if there is no such payment with the required id', async () => {
      // arrange
      const fakeInfo = new PaymentInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.paymentId = 3;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const findOneSpy = jest
        .spyOn(paymentsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      const deleteSpy = jest
        .spyOn(paymentsRepo, 'delete')
        .mockReturnValue(Promise.resolve(payment));

      // act assert
      expect(() => sut.deletePayment(fakeInfo)).rejects.toThrowError();
    });

    it('should call paymentsRepo.delete() once with correct payment id', async () => {
      // arrange
      const fakeInfo = new PaymentInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.paymentId = 3;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const findOneSpy = jest
        .spyOn(paymentsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(payment));

      const deleteSpy = jest
        .spyOn(paymentsRepo, 'delete')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.deletePayment(fakeInfo);

      // assert
      expect(deleteSpy).toBeCalledWith(payment.id);
      expect(deleteSpy).toBeCalledTimes(1);
    });

    it('should return the found payment', async () => {
      // arrange
      const fakeInfo = new PaymentInfoDTO();
      fakeInfo.userId = 15;
      fakeInfo.paymentId = 3;

      const payment: Payment = {
        id: 20,
        userId: 10,
        date: '12/12/12',
        value: '15.00',
        account: {
          id: 5,
          type: 'Bank',
          payments: [],
        },
        details: {
          id: 1,
          type: {
            id: 1,
            name: 'Expense',
            details: [],
          },
          category: 'Drink',
          payments: [],
        },
      };

      const transformedPayment = plainToClass(ShowPaymentDTO, payment, {
        excludeExtraneousValues: true,
      });

      const findOneSpy = jest
        .spyOn(paymentsRepo, 'findOne')
        .mockReturnValue(Promise.resolve(payment));

      const deleteSpy = jest
        .spyOn(paymentsRepo, 'delete')
        .mockReturnValue(Promise.resolve(payment));

      // act
      const result = await sut.deletePayment(fakeInfo);

      // assert
      expect(result).toEqual(transformedPayment);
      expect(result).toBeInstanceOf(ShowPaymentDTO);
    });
  });
});
