import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetList from "../../components/Budget/BudgetList/BudgetList";
import CreateBudget from "../../components/Budget/CreateBudget/CreateBudget";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";
import {
  createBudget,
  deleteBudget,
  fetchBudgets,
  updateBudget,
} from "../../store/actions/budgets";

const Budget = (props) => {
  const dispatch = useDispatch();
  const budgetsState = useSelector((state) => state.budgets);

  useEffect(() => dispatch(fetchBudgets()), [dispatch]);

  if (budgetsState.loading) return <Loader />;
  if (budgetsState.error) return <Error />;

  const create = (budget) => dispatch(createBudget(budget));
  const update = (id, budget) => dispatch(updateBudget(id, budget));
  const remove = (budgetId) => dispatch(deleteBudget(budgetId));

  return (
    <div>
      <CreateBudget create={create} />
      <br />
      <BudgetList
        budgets={budgetsState.budgets}
        remove={remove}
        update={update}
      />
    </div>
  );
};

export default Budget;
