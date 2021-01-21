import React, { useState } from "react";
import CreateBudget from "../CreateBudget/CreateBudget";

const BudgetDetails = (props) => {
  const { id, type, payments, remove } = props;

  return (
    <div>
      <div>
        <div>{type}</div>
        <div>
          {payments.map((x, i) => (
            <div key={i}>
              <div>{i + 1}</div>
              <div>{x.value}</div>
              <div>{x.category}</div>
              <div>{x.type}</div>
            </div>
          ))}
        </div>

        <button onClick={remove}>Delete!</button>
      </div>
    </div>
  );
};

export default BudgetDetails;
