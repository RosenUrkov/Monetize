import {
  PAYMENTS_REQUEST_START,
  PAYMENTS_REQUEST_FAIL,
  FETCH_PAYMENTS_SUCCESS,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_SUCCESS,
} from "../actionTypes";

const initialState = {
  payments: [],
  error: null,
  loading: false,
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENTS_REQUEST_START:
      return { ...state, error: null, loading: true };
    case PAYMENTS_REQUEST_FAIL:
      return { ...state, error: action.error, loading: false };
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payments,
        error: null,
        loading: false,
      };
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: [...state.payments, action.payment],
        error: null,
        loading: false,
      };
    case UPDATE_PAYMENT_SUCCESS:
      const index = state.payments.find((x) => x.id === action.payment.id);
      const updatedPayments = [...state.payments];
      updatedPayments[index] = action.payment;

      return {
        ...state,
        payments: updatedPayments,
        error: null,
        loading: false,
      };
    case DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: state.payments.filter((x) => x.id !== action.paymentId),
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default paymentsReducer;
