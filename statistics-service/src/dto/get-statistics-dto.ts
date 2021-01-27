import { IsDefined, IsNumber } from 'class-validator';
import { BudgetType } from 'src/common/enums/budget-type.enum';

// validation
export class GetStatisticsDTO {
  @IsDefined()
  public userId: number;

  @IsDefined()
  public budgetType: BudgetType;

  @IsDefined()
  public startDate: string;
}
