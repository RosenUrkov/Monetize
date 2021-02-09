import {
  STATISTICS_HIDE_MESSAGE,
  STATISTICS_REQUEST_FAIL,
  STATISTICS_REQUEST_START,
  FETCH_STATISTICS_SUCCESS,
} from "../actionTypes";

const initialState = {
  paymentsOfDate: [],
  paymentsToBudgetDifference: [],
  message: null,
  error: null,
  loading: false,
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATISTICS_REQUEST_START:
      return {
        ...state,
        paymentsOfDate: [],
        paymentsToBudgetDifference: [],
        message: null,
        error: null,
        loading: true,
      };
    case STATISTICS_REQUEST_FAIL:
      return { ...state, message: null, error: action.error, loading: false };
    case STATISTICS_HIDE_MESSAGE:
      return { ...state, message: null, error: null };
    case FETCH_STATISTICS_SUCCESS:
      return {
        ...state,
        paymentsOfDate: action.paymentsOfDate,
        paymentsToBudgetDifference: action.paymentsToBudgetDifference,
        message: null,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default statisticsReducer;
