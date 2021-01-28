import { PaymentType as PaymentTypeEntity } from '../../../entities/payment-type.entity';
import { PaymentType } from '../../../common/enums/payment-type.enum';
import { createConnection, Repository, In } from 'typeorm';
import { PaymentDetails } from '../../../entities/payment-details.entity';
import { ExpenseCategory } from '../../../common/enums/expense-category';
import { IncomeCategory } from '../../..//common/enums/income-category.enum';
import { Account } from '../../../entities/account.entity';
import { AccountType } from '../../..//common/enums/account-type.enum';

const seedPaymentAccounts = async (connection) => {
  const paymentAccountsRepo: Repository<Account> = connection.manager.getRepository(
    Account,
  );

  const seedPaymentAccounts = await paymentAccountsRepo.find();
  if (seedPaymentAccounts.length) {
    console.log('The payment accounts are already seeded!');
    return seedPaymentAccounts;
  }

  const accountsSeeding = Object.keys(AccountType).map((typeName) => {
    const entity: Partial<Account> = { type: typeName };
    return paymentAccountsRepo.save(entity);
  });

  const createdAccounts = await Promise.all(accountsSeeding);
  console.log('Seeded payment accounts successfully!');

  return createdAccounts;
};

const seedPaymentTypes = async (connection) => {
  const paymentTypesRepo: Repository<PaymentTypeEntity> = connection.manager.getRepository(
    PaymentTypeEntity,
  );

  const seedPaymentTypes = await paymentTypesRepo.find();
  if (seedPaymentTypes.length) {
    console.log('The payment types are already seeded!');
    return seedPaymentTypes;
  }

  const typesSeeding = Object.keys(PaymentType).map((typeName) => {
    const entity: Partial<PaymentTypeEntity> = { name: typeName };
    return paymentTypesRepo.save(entity);
  });

  const createdTypes = await Promise.all(typesSeeding);
  console.log('Seeded payment types successfully!');

  return createdTypes;
};

const seedPaymentDetails = async (connection, paymentTypes) => {
  const paymentDetailsRepo: Repository<PaymentDetails> = connection.manager.getRepository(
    PaymentDetails,
  );

  const seedPaymentDetails = await paymentDetailsRepo.find();
  if (seedPaymentDetails.length) {
    console.log('The payment details are already seeded!');
    return seedPaymentDetails;
  }

  const expenseType = paymentTypes.find((x) => x.name === PaymentType.Expense);
  const expenseCategorySeeding = Object.keys(ExpenseCategory).map(
    (categoryName) => {
      const entity: Partial<PaymentDetails> = {
        category: categoryName,
        type: expenseType,
      };

      return paymentDetailsRepo.save(entity);
    },
  );

  const incomeType = paymentTypes.find((x) => x.name === PaymentType.Income);
  const incomeCategorySeeding = Object.keys(IncomeCategory).map(
    (categoryName) => {
      const entity: Partial<PaymentDetails> = {
        category: categoryName,
        type: incomeType,
      };

      return paymentDetailsRepo.save(entity);
    },
  );

  const createdDetails = await Promise.all([
    ...expenseCategorySeeding,
    ...incomeCategorySeeding,
  ]);

  console.log('Seeded payment details successfully!');

  return createdDetails;
};

const seed = async () => {
  console.log('Seed started!');
  const connection = await createConnection();

  const paymentAccounts = await seedPaymentAccounts(connection);
  const paymentTypes = await seedPaymentTypes(connection);
  const paymentDetails = await seedPaymentDetails(connection, paymentTypes);

  await connection.close();
  console.log('Seed completed!');
};

seed().catch(console.error);
