import React, { Fragment, useState } from "react";
import { budgetTypes } from "../../../constants/budgetTypes";
import Accordion from "../../UI/Accordion/Accordion";
import BudgetDetails from "../BudgetDetails/BudgetDetails";

const BudgetList = (props) => {
  const { budgets, remove, update } = props;

  const [budgetDetails, setBudgetDetails] = useState(0);

  const showNewBudgetDetails = (detailsIndex) => (ev, expanded) => {
    setBudgetDetails(expanded ? detailsIndex : false);
  };

  const types = Object.keys(budgetTypes);
  const sortedBudgetsWithIcons = budgets.reduce((sorted, curr) => {
    const index = types.findIndex((x) => curr.type === x);
    const copy = { ...curr, icon: budgetTypes[curr.type].icon };
    sorted[index] = copy;

    return sorted;
  }, []);

  return (
    <div>
      {sortedBudgetsWithIcons.map((budget, index) => {
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
            <BudgetDetails payments={budget.payments} />
          </Accordion>
        );
      })}
    </div>
  );
};

export default BudgetList;
