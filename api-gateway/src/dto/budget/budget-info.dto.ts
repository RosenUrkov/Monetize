import { IsDefined } from 'class-validator';

export class BudgetInfoDTO {
  @IsDefined()
  public budgetId: number;

  @IsDefined()
  public userId: number;
}
