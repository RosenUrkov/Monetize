import { IsDefined, IsEnum, IsNumber, Validate } from 'class-validator';
import { BudgetType } from '../common/enums/budget-type.enum';
import { IsValidDateString } from '../common/validators/is-valid-date-string.validator';

export class GetStatisticsDTO {
  @IsNumber()
  public userId: number;

  @IsEnum(BudgetType)
  public budgetType: BudgetType;

  @Validate(IsValidDateString)
  public startDate: string;
}
