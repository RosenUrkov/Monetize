import { BudgetType as BudgetTypeEntity } from './../../../entities/budget-type.entity';
import { BudgetType } from './../../../common/enums/budget-type.enum';
import { createConnection, Repository, In } from 'typeorm';
import { PaymentType as PaymentTypeEntity } from './../../../entities/payment-type.entity';
import { PaymentType } from './../../../common/enums/payment-type.enum';
import { PaymentDetails } from './../../../entities/payment-details.entity';
import { ExpenseCategory } from './../../../common/enums/expense-category';
import { IncomeCategory } from './../../../common/enums/income-category.enum';

const seedBudgetTypes = async (connection) => {
  const budgetTypesRepo: Repository<BudgetTypeEntity> = connection.manager.getRepository(
    BudgetTypeEntity,
  );

  const seedBudgetTypes = await budgetTypesRepo.find();
  if (seedBudgetTypes.length) {
    console.log('The budget types are already seeded!');
    return seedBudgetTypes;
  }

  const budgetTypesSeeding = Object.keys(BudgetType).map((typeName) => {
    const entity: Partial<BudgetTypeEntity> = { name: typeName };
    return budgetTypesRepo.save(entity);
  });

  const createdBudgetTypes = await Promise.all(budgetTypesSeeding);
  console.log('Seeded budget types successfully!');

  return createdBudgetTypes;
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

  const budgetTypes = await seedBudgetTypes(connection);
  const paymentTypes = await seedPaymentTypes(connection);
  const paymentDetails = await seedPaymentDetails(connection, paymentTypes);

  await connection.close();
  console.log('Seed completed!');
};

seed().catch(console.error);
