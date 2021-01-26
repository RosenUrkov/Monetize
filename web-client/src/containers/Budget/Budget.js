import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetList from "../../components/Budget/BudgetList/BudgetList";
import Loader from "../../components/UI/Loader/Loader";
import {
  budgetsHideMessage,
  createBudget,
  deleteBudget,
  fetchBudgets,
  updateBudget,
} from "../../store/actions/budgets";
import withToasts from "../../hoc/withToasts";

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

  const startUpdate = (id) => {
    console.log(id);
  };

  return (
    <div>
      <BudgetList
        budgets={budgetsState.budgets}
        remove={remove}
        update={startUpdate}
      />
    </div>
  );
};

export default withToasts(Budget);
