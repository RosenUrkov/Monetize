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
import useCreateAndUpdateFormControl from "../../hooks/useCreateAndUpdateFormControl";
import { makeStyles } from "@material-ui/core";
import NothingToShow from "../../components/Error/NothingToShow/NothingToShow";

const useStyles = makeStyles((theme) => ({
  toolbarHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  addButton: {
    alignSelf: "center",
  },
}));

const Budget = (props) => {
  const { showToast } = props;

  const dispatch = useDispatch();
  const budgetsState = useSelector((state) => state.budgets);

  const classes = useStyles();

  const {
    entityToUpdate,
    showForm,
    openForm,
    startCreate,
    startUpdate,
    finishCreate,
    finishUpdate,
    cancelForm,
  } = useCreateAndUpdateFormControl(createBudget, updateBudget);

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

  const remove = (budgetId) => dispatch(deleteBudget(budgetId));

  const usedBudgetTypes = budgetsState.budgets.map((x) => x.type);
  const freeBudgetTypes = Object.keys(budgetTypes).filter(
    (x) => !usedBudgetTypes.includes(x)
  );

  return (
    <div>
      <div className={classes.toolbarHeader}>
        <h2>Current Budgets</h2>

        <Fab
          color="secondary"
          aria-label="add"
          size="small"
          className={classes.addButton}
          onClick={startCreate}
          disabled={freeBudgetTypes.length === 0}
        >
          <AddIcon />
        </Fab>
      </div>

      {showForm && (
        <BudgetForm
          open={openForm}
          freeBudgetTypes={freeBudgetTypes}
          baseBudget={entityToUpdate}
          submit={entityToUpdate ? finishUpdate : finishCreate}
          close={cancelForm}
        />
      )}

      {!budgetsState.budgets?.length && <NothingToShow />}

      {!!budgetsState.budgets?.length && (
        <BudgetList
          budgets={budgetsState.budgets}
          remove={remove}
          update={startUpdate}
        />
      )}
    </div>
  );
};

export default withToasts(Budget);
