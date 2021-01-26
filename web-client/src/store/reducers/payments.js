import {
  PAYMENTS_REQUEST_START,
  PAYMENTS_REQUEST_FAIL,
  FETCH_PAYMENTS_SUCCESS,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_SUCCESS,
  PAYMENTS_HIDE_MESSAGE,
} from "../actionTypes";

const initialState = {
  payments: [],
  message: null,
  error: null,
  loading: false,
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENTS_REQUEST_START:
      return { ...state, message: null, error: null, loading: true };
    case PAYMENTS_REQUEST_FAIL:
      return { ...state, message: null, error: action.error, loading: false };
    case PAYMENTS_HIDE_MESSAGE:
      return { ...state, message: null, error: null };
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: action.payments,
        message: null,
        error: null,
        loading: false,
      };
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: [...state.payments, action.payment],
        message: "Payment created successfully!",
        error: null,
        loading: false,
      };
    case UPDATE_PAYMENT_SUCCESS:
      const index = state.payments.findIndex((x) => x.id === action.payment.id);
      const updatedPayments = [...state.payments];
      updatedPayments[index] = action.payment;

      return {
        ...state,
        payments: updatedPayments,
        message: "Payment updated successfully!",
        error: null,
        loading: false,
      };
    case DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: state.payments.filter((x) => x.id !== action.paymentId),
        message: "Payment deleted successfully!",
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default paymentsReducer;
