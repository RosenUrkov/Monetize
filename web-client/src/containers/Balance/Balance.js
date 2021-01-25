import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "../../components/Payments/PaymentForm/PaymentForm";
import PaymentList from "../../components/Payments/PaymentList/PaymentList";
import Error from "../../components/Error/Error/Error";
import Loader from "../../components/UI/Loader/Loader";
import {
  createPayment,
  deletePayment,
  fetchPayments,
  updatePayment,
} from "../../store/actions/payments";
import DatePicker from "../../components/UI/DatePicker/DatePicker";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { formatDate } from "../../common/formatDate";

const Balance = (props) => {
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

  if (paymentsState.loading) return <Loader />;
  if (paymentsState.error) return <Error />;

  const create = (payment) => dispatch(createPayment(payment));
  const update = (id, payment) => dispatch(updatePayment(id, payment));
  const remove = (paymentId) => dispatch(deletePayment(paymentId));

  const startCreate = () => {
    setPaymentToUpdate(null);
    setOpenPaymentForm(true);
    setShowPaymentForm(true);
  };

  const finishCreate = (payment) => {
    create(payment);
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
    update(paymentToUpdate.id, payment);
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

export default Balance;
