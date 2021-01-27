import { groupBy } from './common/helpers/group-by.helper';
import { formatDate } from './common/helpers/format-date.helper';
import { getEndBudgetDate } from './common/helpers/get-end-budget-date.helper';
import { Injectable } from '@nestjs/common';
import { BudgetType } from './common/enums/budget-type.enum';
import { BalancePayload } from './dto/balance-payload.dto';
import { BudgetPayload } from './dto/budget-payload.dto';
import { GetStatisticsDTO } from './dto/get-statistics-dto';
import { ShowPaymentDTO } from './dto/show-payment.dto';
import { ShowBudgetDTO } from './dto/show-budget.dto';
import { ShowBudgetPaymentDTO } from './dto/show-budget-payment.dto';
import { ShowStatisticsDTO } from './dto/show-statistics.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private balanceActions: BalancePayload[] = [];
  private budgetActions: BudgetPayload[] = [];

  public getStatistics(info: GetStatisticsDTO): ShowStatisticsDTO {
    const endDate = getEndBudgetDate(new Date(info.startDate), info.budgetType);
    const endDateString = formatDate(endDate);

    const start = Date.parse(info.startDate);
    const end = Date.parse(endDateString);

    const paymentsOfDate: ShowPaymentDTO[] = this.balanceActions
      .find((x) => x.userId === info.userId)
      ?.payments?.filter(
        (x) => start <= Date.parse(x.date) && Date.parse(x.date) < end,
      );

    if (!paymentsOfDate) {
      throw new RpcException({
        message: 'The user does not have payments yet!',
        code: 400,
      });
    }

    const grouping = groupBy<ShowPaymentDTO>(paymentsOfDate, (x) => x.category);
    const accumulatedPayments: ShowBudgetPaymentDTO[] = Object.keys(grouping)
      .map((category) => {
        const type = grouping[category][0]?.type;
        const value = grouping[category]
          .reduce((acc, curr) => acc + Number(curr.value), 0)
          .toString();

        return {
          type,
          category,
          value,
        };
      })
      .sort((x, y) => x.category.localeCompare(y.category));

    const budgetPayments: ShowBudgetPaymentDTO[] = this.budgetActions
      .find((x) => x.userId === info.userId)
      ?.budgets?.find((x) => x.type === info.budgetType)
      ?.payments?.sort((x, y) => x.category.localeCompare(y.category));

    if (!budgetPayments) {
      throw new RpcException({
        message: 'The user does not have a budget of this type yet!',
        code: 400,
      });
    }

    let balIndex = 0;
    let budIndex = 0;
    const paymentsToBudgetDifference: ShowBudgetPaymentDTO[] = [];

    while (accumulatedPayments[balIndex] && budgetPayments[budIndex]) {
      if (
        accumulatedPayments[balIndex].category.localeCompare(
          budgetPayments[budIndex].category,
        ) < 0
      ) {
        const isIncome =
          accumulatedPayments[balIndex].type === 'Income' ? 1 : -1;

        const categoryResult = { ...accumulatedPayments[balIndex] };
        categoryResult.value = (
          Number(categoryResult.value) * isIncome
        ).toString();

        paymentsToBudgetDifference.push(categoryResult);

        balIndex++;
        continue;
      }

      if (
        accumulatedPayments[balIndex].category.localeCompare(
          budgetPayments[budIndex].category,
        ) > 0
      ) {
        const isIncome = budgetPayments[budIndex].type === 'Income' ? -1 : 1;

        const categoryResult = { ...budgetPayments[budIndex] };
        categoryResult.value = (
          Number(categoryResult.value) * isIncome
        ).toString();

        paymentsToBudgetDifference.push(categoryResult);

        budIndex++;
        continue;
      }

      const categoryResult = {
        type: accumulatedPayments[balIndex].type,
        category: accumulatedPayments[balIndex].category,
        value: (
          Number(budgetPayments[budIndex].value) -
          Number(accumulatedPayments[balIndex].value)
        ).toString(),
      };
      paymentsToBudgetDifference.push(categoryResult);

      balIndex++;
      budIndex++;
    }

    while (accumulatedPayments[balIndex]) {
      const isIncome = budgetPayments[budIndex].type === 'Income' ? 1 : -1;

      const categoryResult = { ...accumulatedPayments[balIndex] };
      categoryResult.value = (
        Number(categoryResult.value) * isIncome
      ).toString();

      paymentsToBudgetDifference.push(categoryResult);
      balIndex++;
    }

    while (budgetPayments[budIndex]) {
      const isIncome = budgetPayments[budIndex].type === 'Income' ? -1 : 1;

      const categoryResult = { ...budgetPayments[budIndex] };
      categoryResult.value = (
        Number(categoryResult.value) * isIncome
      ).toString();

      paymentsToBudgetDifference.push(categoryResult);
      budIndex++;
    }

    return {
      paymentsOfDate,
      paymentsToBudgetDifference,
    };
  }

  public handleBalanceAction(data: BalancePayload): void {
    this.balanceActions.push(data);
  }

  public handleBudgetAction(data: BudgetPayload): void {
    this.budgetActions.push(data);
  }
}
