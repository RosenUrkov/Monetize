import httpProvider from "../../common/httpProvider";
import {
  BUDGETS_REQUEST_FAIL,
  BUDGETS_REQUEST_START,
  CREATE_BUDGET_SUCCESS,
  DELETE_BUDGET_SUCCESS,
  UPDATE_BUDGET_SUCCESS,
  FETCH_BUDGETS_SUCCESS,
  BUDGETS_HIDE_MESSAGE,
} from "../actionTypes";

const budgetsRequestStart = () => {
  return {
    type: BUDGETS_REQUEST_START,
  };
};

const budgetsRequestFail = (error) => {
  return {
    type: BUDGETS_REQUEST_FAIL,
    error,
  };
};

const fetchBudgetsSuccess = (budgets) => {
  return {
    type: FETCH_BUDGETS_SUCCESS,
    budgets,
  };
};

const createBudgetSuccess = (budget) => {
  return {
    type: CREATE_BUDGET_SUCCESS,
    budget,
  };
};

const updateBudgetSuccess = (budget) => {
  return {
    type: UPDATE_BUDGET_SUCCESS,
    budget,
  };
};

const deleteBudgetSuccess = (budgetId) => {
  return {
    type: DELETE_BUDGET_SUCCESS,
    budgetId,
  };
};

export const budgetsHideMessage = () => {
  return {
    type: BUDGETS_HIDE_MESSAGE,
  };
};

export const fetchBudgets = () => {
  return (dispatch) => {
    dispatch(budgetsRequestStart());

    httpProvider
      .get("budgets")
      .then((res) => {
        dispatch(fetchBudgetsSuccess(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(budgetsRequestFail(error.response.data));
      });
  };
};

export const createBudget = (budgetData) => {
  return (dispatch) => {
    dispatch(budgetsRequestStart());

    httpProvider
      .post("budgets", budgetData)
      .then((res) => {
        dispatch(createBudgetSuccess(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(budgetsRequestFail(error.response.data));
      });
  };
};

export const updateBudget = (id, budgetData) => {
  return (dispatch) => {
    dispatch(budgetsRequestStart());

    httpProvider
      .put(`budgets/${id}`, budgetData)
      .then((res) => {
        dispatch(updateBudgetSuccess(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(budgetsRequestFail(error.response.data));
      });
  };
};

export const deleteBudget = (budgetId) => {
  return (dispatch) => {
    dispatch(budgetsRequestStart());

    httpProvider
      .delete(`budgets/${budgetId}`)
      .then((res) => {
        dispatch(deleteBudgetSuccess(budgetId));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(budgetsRequestFail(error.response.data));
      });
  };
};
