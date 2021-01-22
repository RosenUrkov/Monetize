import {
  BUDGETS_REQUEST_FAIL,
  BUDGETS_REQUEST_START,
  CREATE_BUDGET_SUCCESS,
  DELETE_BUDGET_SUCCESS,
  UPDATE_BUDGET_SUCCESS,
  FETCH_BUDGETS_SUCCESS,
} from "../actionTypes";

const initialState = {
  budgets: [],
  error: null,
  loading: false,
};

const budgetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUDGETS_REQUEST_START:
      return { ...state, error: null, loading: true };
    case BUDGETS_REQUEST_FAIL:
      return { ...state, error: action.error, loading: false };
    case FETCH_BUDGETS_SUCCESS:
      return {
        ...state,
        budgets: action.budgets,
        error: null,
        loading: false,
      };
    case CREATE_BUDGET_SUCCESS:
      return {
        ...state,
        budgets: [...state.budgets, action.budget],
        error: null,
        loading: false,
      };
    case UPDATE_BUDGET_SUCCESS:
      const index = state.budgets.find((x) => x.id === action.budget.id);
      const updatedBudgets = [...state.budgets];
      updatedBudgets[index] = action.budget;

      return {
        ...state,
        budgets: updatedBudgets,
        error: null,
        loading: false,
      };
    case DELETE_BUDGET_SUCCESS:
      return {
        ...state,
        budgets: state.budgets.filter((x) => x.id !== action.budgetId),
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default budgetsReducer;
