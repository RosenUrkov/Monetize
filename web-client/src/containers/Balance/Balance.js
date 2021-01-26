import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "../../components/Payments/PaymentForm/PaymentForm";
import PaymentList from "../../components/Payments/PaymentList/PaymentList";
import Loader from "../../components/UI/Loader/Loader";
import {
  createPayment,
  deletePayment,
  fetchPayments,
  paymentsHideMessage,
  updatePayment,
} from "../../store/actions/payments";
import DatePicker from "../../components/UI/DatePicker/DatePicker";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { formatDate } from "../../common/formatDate";
import withToasts from "../../hoc/withToasts";

const Balance = (props) => {
  const { showToast } = props;

  const dispatch = useDispatch();
  const paymentsState = useSelector((state) => state.payments);

  const [paymentsDate, setPaymentsDate] = useState(new Date());
  const [displayPayments, setDisplayPayments] = useState([]);

  const [paymentToUpdate, setPaymentToUpdate] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);

  useEffect(() => dispatch(fetchPayments()), [dispatch]);

  useEffect(() => {
    const paymentsDateFormatted = formatDate(paymentsDate);
    const filteredPayments = paymentsState.payments.filter(
      (payment) => payment.date === paymentsDateFormatted
    );

    setDisplayPayments(filteredPayments);
  }, [paymentsState.payments, paymentsDate]);

  useEffect(() => {
    if (paymentsState.message) {
      showToast(paymentsState.message, "success");
      dispatch(paymentsHideMessage());
    }
  }, [dispatch, paymentsState.message, showToast]);

  useEffect(() => {
    if (paymentsState.error) {
      showToast(paymentsState.error.message, "error");
      dispatch(paymentsHideMessage());
    }
  }, [dispatch, paymentsState.error, showToast]);

  if (paymentsState.loading) return <Loader />;

  const remove = (paymentId) => {
    dispatch(deletePayment(paymentId));
  };

  const startCreate = () => {
    setPaymentToUpdate(null);
    setOpenPaymentForm(true);
    setShowPaymentForm(true);
  };

  const finishCreate = (payment) => {
    dispatch(createPayment(payment));
    setOpenPaymentForm(false);

    setTimeout(() => {
      setShowPaymentForm(false);
    }, 500);
  };

  const startUpdate = (payment) => {
    setPaymentToUpdate(payment);
    setOpenPaymentForm(true);
    setShowPaymentForm(true);
  };

  const finishUpdate = (payment) => {
    dispatch(updatePayment(paymentToUpdate.id, payment));
    setPaymentToUpdate(null);
    setOpenPaymentForm(false);

    setTimeout(() => {
      setShowPaymentForm(false);
    }, 500);
  };

  const cancelPaymentForm = () => {
    setPaymentToUpdate(null);
    setOpenPaymentForm(false);

    setTimeout(() => {
      setShowPaymentForm(false);
    }, 500);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          style={{ alignSelf: "center" }}
          onClick={startCreate}
        >
          <AddIcon />
        </Fab>

        <DatePicker
          label="Balance for:"
          date={paymentsDate}
          changeDate={(newDate) => setPaymentsDate(newDate)}
        />
      </div>

      {showPaymentForm && (
        <PaymentForm
          open={openPaymentForm}
          basePayment={paymentToUpdate}
          submit={paymentToUpdate ? finishUpdate : finishCreate}
          close={cancelPaymentForm}
        />
      )}

      <br />

      <PaymentList
        payments={displayPayments}
        remove={remove}
        startUpdate={startUpdate}
      />
    </div>
  );
};

export default withToasts(Balance);
