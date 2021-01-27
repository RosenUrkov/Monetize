import { BudgetType } from '../enums/budget-type.enum';

export const getEndBudgetDate = (
  startDate: Date,
  budgetType: BudgetType,
): Date => {
  const endDate = new Date(startDate);

  if (budgetType === BudgetType.Day) {
    endDate.setUTCDate(endDate.getUTCDate() + 1);
    return endDate;
  }
  if (budgetType === BudgetType.Month) {
    endDate.setUTCMonth(endDate.getUTCMonth() + 1);
    return endDate;
  }
  if (budgetType === BudgetType.Annual) {
    endDate.setUTCFullYear(endDate.getUTCFullYear() + 1);
    return endDate;
  }
};
