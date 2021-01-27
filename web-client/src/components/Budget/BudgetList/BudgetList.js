import React, { Fragment, useState } from "react";
import { budgetPaymentColumns } from "../../../constants/budgetPaymentColumns";
import { budgetTypes } from "../../../constants/budgetTypes";
import Accordion from "../../UI/Accordion/Accordion";
import Table from "../../UI/Table/Table";

const BudgetList = (props) => {
  const { budgets, remove, update } = props;

  const [budgetDetails, setBudgetDetails] = useState(0);
  const showNewBudgetDetails = (detailsIndex) => (ev, expanded) => {
    setBudgetDetails(expanded ? detailsIndex : false);
  };

  const types = Object.keys(budgetTypes);
  const sortedBudgetsWithIcons = budgets
    .reduce((sorted, curr) => {
      const index = types.findIndex((x) => curr.type === x);
      const copy = { ...curr, icon: budgetTypes[curr.type].icon };
      sorted[index] = copy;

      return sorted;
    }, [])
    .filter((x) => !!x);

  return (
    <div>
      {sortedBudgetsWithIcons.map((budget, index) => {
        console.log(sortedBudgetsWithIcons, budgetDetails, index);
        return (
          <Accordion
            title={budget.type}
            TitleIcon={budget.icon}
            key={budget.id}
            expanded={budgetDetails === index}
            onChange={showNewBudgetDetails(index)}
            update={() => update(budget)}
            remove={() => remove(budget.id)}
          >
            <Table
              columns={budgetPaymentColumns}
              data={budget.payments}
              pagination={false}
            />
          </Accordion>
        );
      })}
    </div>
  );
};

export default BudgetList;
