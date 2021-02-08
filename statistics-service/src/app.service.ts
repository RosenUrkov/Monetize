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
import { PaymentType } from './common/enums/payment-type.enum';
import { UserInfoDTO } from './dto/user-info.dto';

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
      ?.payments?.filter((x) => {
        const date = Date.parse(x.date);
        return start <= date && date < end;
      });

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

    let balanceIndex = 0;
    let budgetIndex = 0;
    const paymentsToBudgetDifference: ShowBudgetPaymentDTO[] = [];

    while (accumulatedPayments[balanceIndex] && budgetPayments[budgetIndex]) {
      const comparison = accumulatedPayments[
        balanceIndex
      ].category.localeCompare(budgetPayments[budgetIndex].category);

      if (comparison < 0) {
        const isIncome =
          accumulatedPayments[balanceIndex].type === PaymentType.Income
            ? 1
            : -1;

        const categoryResult = { ...accumulatedPayments[balanceIndex] };
        categoryResult.value = (
          Number(categoryResult.value) * isIncome
        ).toString();

        paymentsToBudgetDifference.push(categoryResult);

        balanceIndex++;
        continue;
      }

      if (comparison > 0) {
        const isIncome =
          budgetPayments[budgetIndex].type === PaymentType.Income ? -1 : 1;

        const categoryResult = { ...budgetPayments[budgetIndex] };
        categoryResult.value = (
          Number(categoryResult.value) * isIncome
        ).toString();

        paymentsToBudgetDifference.push(categoryResult);

        budgetIndex++;
        continue;
      }

      const categoryResult = {
        type: accumulatedPayments[balanceIndex].type,
        category: accumulatedPayments[balanceIndex].category,
        value: (
          Number(budgetPayments[budgetIndex].value) -
          Number(accumulatedPayments[balanceIndex].value)
        ).toString(),
      };

      paymentsToBudgetDifference.push(categoryResult);

      balanceIndex++;
      budgetIndex++;
    }

    while (accumulatedPayments[balanceIndex]) {
      const isIncome =
        accumulatedPayments[balanceIndex].type === PaymentType.Income ? 1 : -1;

      const categoryResult = { ...accumulatedPayments[balanceIndex] };
      categoryResult.value = (
        Number(categoryResult.value) * isIncome
      ).toString();

      paymentsToBudgetDifference.push(categoryResult);

      balanceIndex++;
    }

    while (budgetPayments[budgetIndex]) {
      const isIncome =
        budgetPayments[budgetIndex].type === PaymentType.Income ? -1 : 1;

      const categoryResult = { ...budgetPayments[budgetIndex] };
      categoryResult.value = (
        Number(categoryResult.value) * isIncome
      ).toString();

      paymentsToBudgetDifference.push(categoryResult);

      budgetIndex++;
    }

    return {
      paymentsOfDate,
      paymentsToBudgetDifference,
    };
  }

  public handleBalanceChange(data: BalancePayload): void {
    const index = this.balanceActions.findIndex(
      (x) => x.userId === data.userId,
    );

    if (index === -1) {
      this.balanceActions.push(data);
      return;
    }

    this.balanceActions[index] = data;
  }

  public handleBudgetChange(data: BudgetPayload): void {
    const index = this.budgetActions.findIndex((x) => x.userId === data.userId);

    if (index === -1) {
      this.budgetActions.push(data);
      return;
    }

    this.budgetActions[index] = data;
  }

  public handleBalanceDelete(data: UserInfoDTO): void {
    const index = this.balanceActions.findIndex(
      (x) => x.userId === data.userId,
    );

    if (index === -1) {
      return;
    }

    this.balanceActions.splice(index, 1);
  }

  public handleBudgetDelete(data: UserInfoDTO): void {
    const index = this.budgetActions.findIndex((x) => x.userId === data.userId);

    if (index === -1) {
      return;
    }

    this.budgetActions.splice(index, 1);
  }
}
