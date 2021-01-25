import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCorrectPaymentCategoryOfType', async: false })
export class IsValidDateString implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const regex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
    return typeof value === 'string' && regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    return `The ${value} is a valid date string with format YYYY-MM-DD!`;
  }
}
