import { IsNumber } from 'class-validator';

export class BudgetInfoDTO {
  @IsNumber()
  public budgetId: number;

  @IsNumber()
  public userId: number;
}
