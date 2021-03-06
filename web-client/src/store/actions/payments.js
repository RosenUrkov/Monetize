import httpProvider from "../../common/httpProvider";
import {
  PAYMENTS_REQUEST_FAIL,
  PAYMENTS_REQUEST_START,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_SUCCESS,
  FETCH_PAYMENTS_SUCCESS,
  PAYMENTS_HIDE_MESSAGE,
} from "../actionTypes";

const paymentsRequestStart = () => {
  return {
    type: PAYMENTS_REQUEST_START,
  };
};

const paymentsRequestFail = (error) => {
  return {
    type: PAYMENTS_REQUEST_FAIL,
    error,
  };
};

const fetchPaymentsSuccess = (payments) => {
  return {
    type: FETCH_PAYMENTS_SUCCESS,
    payments,
  };
};

const createPaymentSuccess = (payment) => {
  return {
    type: CREATE_PAYMENT_SUCCESS,
    payment,
  };
};

const updatePaymentSuccess = (payment) => {
  return {
    type: UPDATE_PAYMENT_SUCCESS,
    payment,
  };
};

const deletePaymentSuccess = (paymentId) => {
  return {
    type: DELETE_PAYMENT_SUCCESS,
    paymentId,
  };
};

export const paymentsHideMessage = () => {
  return {
    type: PAYMENTS_HIDE_MESSAGE,
  };
};

export const fetchPayments = () => {
  return (dispatch) => {
    dispatch(paymentsRequestStart());

    httpProvider
      .get("payments")
      .then((res) => {
        dispatch(fetchPaymentsSuccess(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(paymentsRequestFail(error.response.data));
      });
  };
};

export const createPayment = (paymentData) => {
  return (dispatch) => {
    dispatch(paymentsRequestStart());

    httpProvider
      .post("payments", paymentData)
      .then((res) => {
        dispatch(createPaymentSuccess(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(paymentsRequestFail(error.response.data));
      });
  };
};

export const updatePayment = (id, paymentData) => {
  return (dispatch) => {
    dispatch(paymentsRequestStart());

    httpProvider
      .put(`payments/${id}`, paymentData)
      .then((res) => {
        dispatch(updatePaymentSuccess(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(paymentsRequestFail(error.response.data));
      });
  };
};

export const deletePayment = (paymentId) => {
  return (dispatch) => {
    dispatch(paymentsRequestStart());

    httpProvider
      .delete(`payments/${paymentId}`)
      .then((res) => {
        dispatch(deletePaymentSuccess(paymentId));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(paymentsRequestFail(error.response.data));
      });
  };
};
