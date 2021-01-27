import { IsDefined, IsNumber } from 'class-validator';

export class GetStatisticsDTO {
  @IsDefined()
  public budgetType: string;

  @IsDefined()
  public startDate: string;
}
