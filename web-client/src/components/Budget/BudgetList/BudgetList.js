import React, { Fragment } from "react";
import BudgetDetails from "../BudgetDetails/BudgetDetails";

const BudgetList = (props) => {
  const { budgets, remove, update } = props;

  return (
    <div>
      {budgets &&
        budgets.map((budget) => (
          <Fragment key={budget.id}>
            <BudgetDetails {...budget} remove={() => remove(budget.id)} />
            <br />
          </Fragment>
        ))}
    </div>
  );
};

export default BudgetList;
