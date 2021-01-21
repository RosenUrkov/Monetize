import { IncomeCategory } from '../enums/income-category.enum';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ExpenseCategory } from '../enums/expense-category';
import { PaymentType } from '../enums/payment-type.enum';
import { CreatePaymentDTO } from 'src/dto/create-payment.dto';

@ValidatorConstraint({ name: 'hasDuplicatePaymentDetails', async: false })
export class HasDuplicatePaymentDetails
  implements ValidatorConstraintInterface {
  validate(value: CreatePaymentDTO[], args: ValidationArguments) {
    if (!value) {
      return false;
    }

    const uniqueGroups = value.reduce((groupings, payment) => {
      const key = payment.type + payment.category;
      if (!groupings[key]) {
        groupings[key] = 0;
      }

      groupings[key] += 1;

      return groupings;
    }, {});

    return Object.values(uniqueGroups).every((x) => x === 1);
  }

  defaultMessage(args: ValidationArguments) {
    return `You must add only payments with unique Type and Category to the budget!`;
  }
}
