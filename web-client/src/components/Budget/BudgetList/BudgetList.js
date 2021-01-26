import React, { Fragment } from "react";
import { budgetTypes } from "../../../constants/budgetTypes";
import Accordion from "../../UI/Accordion/Accordion";
import BudgetDetails from "../BudgetDetails/BudgetDetails";

// [
//   {
//       "id": 3,
//       "type": "Month",
//       "payments": [
//           {
//               "value": "20.00",
//               "type": "Expense",
//               "category": "Drink"
//           },
//           {
//               "value": "20.00",
//               "type": "Income",
//               "category": "Salary"
//           }
//       ]
//   },
//   {
//       "id": 4,
//       "type": "Day",
//       "payments": [
//           {
//               "value": "20.00",
//               "type": "Expense",
//               "category": "Drink"
//           },
//           {
//               "value": "30.00",
//               "type": "Income",
//               "category": "Salary"
//           }
//       ]
//   }
// ]

const BudgetList = (props) => {
  const { budgets, remove, update } = props;

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
            update={() => update(budget.id)}
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
