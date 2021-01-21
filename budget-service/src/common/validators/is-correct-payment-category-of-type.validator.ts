import { IncomeCategory } from '../enums/income-category.enum';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ExpenseCategory } from '../enums/expense-category';
import { PaymentType } from '../enums/payment-type.enum';

@ValidatorConstraint({ name: 'isCorrectPaymentCategoryOfType', async: false })
export class IsCorrectPaymentCategoryOfType
  implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const type = (args.object as any).type;

    if (
      type === PaymentType.ChangingExpense ||
      type === PaymentType.RegularExpense
    ) {
      return Object.values(ExpenseCategory).includes(value);
    }
    if (
      type === PaymentType.ChangingIncome ||
      type === PaymentType.RegularIncome
    ) {
      return Object.values(IncomeCategory).includes(value);
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    const type = (args.object as any).type;
    const currentType =
      type === PaymentType.ChangingExpense ||
      type === PaymentType.RegularExpense
        ? 'Expense'
        : 'Income';

    return `The ${value} is not part of the ${currentType} types!`;
  }
}
