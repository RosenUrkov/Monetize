import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetList from "../../components/Budget/BudgetList/BudgetList";
import CreateBudget from "../../components/Budget/CreateBudget/CreateBudget";
import Loader from "../../components/UI/Loader/Loader";
import {
  budgetsHideMessage,
  createBudget,
  deleteBudget,
  fetchBudgets,
  updateBudget,
} from "../../store/actions/budgets";

const Budget = (props) => {
  const { showToast } = props;

  const dispatch = useDispatch();
  const budgetsState = useSelector((state) => state.budgets);

  useEffect(() => dispatch(fetchBudgets()), [dispatch]);

  useEffect(() => {
    if (budgetsState.message) {
      showToast(budgetsState.message, "success");
      dispatch(budgetsHideMessage());
    }
  }, [dispatch, budgetsState.message, showToast]);

  useEffect(() => {
    if (budgetsState.error) {
      showToast(budgetsState.error.message, "error");
      dispatch(budgetsHideMessage());
    }
  }, [dispatch, budgetsState.error, showToast]);

  if (budgetsState.loading) return <Loader />;

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
