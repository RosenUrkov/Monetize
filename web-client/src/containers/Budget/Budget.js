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
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import BudgetForm from "../../components/Budget/BudgetForm/BudgetForm";
import { budgetTypes } from "../../constants/budgetTypes";

const Budget = (props) => {
  const { showToast } = props;

  const dispatch = useDispatch();
  const budgetsState = useSelector((state) => state.budgets);

  const [budgetToUpdate, setBudgetToUpdate] = useState(null);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [openBudgetForm, setOpenBudgetForm] = useState(false);

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

  const usedBudgetTypes = budgetsState.budgets.map((x) => x.type);
  const freeBudgetTypes = Object.keys(budgetTypes).filter(
    (x) => !usedBudgetTypes.includes(x)
  );

  const remove = (budgetId) => {
    dispatch(deleteBudget(budgetId));
  };

  const startCreate = () => {
    setBudgetToUpdate(null);
    setOpenBudgetForm(true);
    setShowBudgetForm(true);
  };

  const finishCreate = (budget) => {
    dispatch(createBudget(budget));
    setOpenBudgetForm(false);

    setTimeout(() => {
      setShowBudgetForm(false);
    }, 500);
  };

  const startUpdate = (budget) => {
    setBudgetToUpdate(budget);
    setOpenBudgetForm(true);
    setShowBudgetForm(true);
  };

  const finishUpdate = (budget) => {
    dispatch(updateBudget(budgetToUpdate.id, budget));
    setBudgetToUpdate(null);
    setOpenBudgetForm(false);

    setTimeout(() => {
      setShowBudgetForm(false);
    }, 500);
  };

  const cancelBudgetForm = () => {
    setBudgetToUpdate(null);
    setOpenBudgetForm(false);

    setTimeout(() => {
      setShowBudgetForm(false);
    }, 500);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Current Budgets</h2>

        <Fab
          color="secondary"
          aria-label="add"
          size="small"
          style={{ alignSelf: "center" }}
          onClick={startCreate}
          disabled={freeBudgetTypes.length === 0}
        >
          <AddIcon />
        </Fab>
      </div>

      {showBudgetForm && (
        <BudgetForm
          open={openBudgetForm}
          freeBudgetTypes={freeBudgetTypes}
          baseBudget={budgetToUpdate}
          submit={budgetToUpdate ? finishUpdate : finishCreate}
          close={cancelBudgetForm}
        />
      )}

      <BudgetList
        budgets={budgetsState.budgets}
        remove={remove}
        update={startUpdate}
      />
    </div>
  );
};

export default withToasts(Budget);
