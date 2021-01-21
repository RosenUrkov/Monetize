import React, { useEffect, useState } from "react";
import BudgetList from "../../components/Budget/BudgetList/BudgetList";
import CreateBudget from "../../components/Budget/CreateBudget/CreateBudget";
import httpProvider from "../../providers/http-provider";

const Budget = (props) => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    httpProvider.get("budgets").then((data) => {
      setBudgets(data);
    });
  }, []);

  const create = (budget) => {
    httpProvider
      .post("budgets", budget)
      .then((budget) => setBudgets((prev) => [...prev, budget]))
      .catch(console.log);
  };

  const update = (id, budget) => {
    httpProvider
      .put(`budgets/${id}`, budget)
      .then((budget) => {
        const index = budgets.findIndex((x) => x.id === budget.id);
        const updatedBudgets = [...budgets];
        updatedBudgets[index] = budget;

        setBudgets(updatedBudgets);
      })
      .catch(console.log);
  };

  const remove = (id) => {
    httpProvider
      .delete(`budgets/${id}`)
      .then((budget) =>
        setBudgets((prev) => prev.filter((x) => x.id !== budget.id))
      )
      .catch(console.log);
  };

  return (
    <div>
      <CreateBudget create={create} />
      <br />
      <BudgetList budgets={budgets} remove={remove} update={update} />
    </div>
  );
};

export default Budget;
