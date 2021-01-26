import {
  BUDGETS_REQUEST_FAIL,
  BUDGETS_REQUEST_START,
  CREATE_BUDGET_SUCCESS,
  DELETE_BUDGET_SUCCESS,
  UPDATE_BUDGET_SUCCESS,
  FETCH_BUDGETS_SUCCESS,
  BUDGETS_HIDE_MESSAGE,
} from "../actionTypes";

const initialState = {
  budgets: [],
  message: null,
  error: null,
  loading: false,
};

const budgetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUDGETS_REQUEST_START:
      return { ...state, message: null, error: null, loading: true };
    case BUDGETS_REQUEST_FAIL:
      return { ...state, message: null, error: action.error, loading: false };
    case BUDGETS_HIDE_MESSAGE:
      return { ...state, message: null, error: null };
    case FETCH_BUDGETS_SUCCESS:
      return {
        ...state,
        budgets: action.budgets,
        message: null,
        error: null,
        loading: false,
      };
    case CREATE_BUDGET_SUCCESS:
      return {
        ...state,
        budgets: [...state.budgets, action.budget],
        message: "Budget created successfully!",
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
        message: "Budget updated successfully!",
        error: null,
        loading: false,
      };
    case DELETE_BUDGET_SUCCESS:
      return {
        ...state,
        budgets: state.budgets.filter((x) => x.id !== action.budgetId),
        message: "Budget deleted successfully!",
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default budgetsReducer;
