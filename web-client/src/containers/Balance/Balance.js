import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePayment from "../../components/Payments/CreatePayment/CreatePayment";
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

const Balance = (props) => {
  const dispatch = useDispatch();
  const paymentsState = useSelector((state) => state.payments);

  const [paymentsDate, setPaymentsDate] = useState(new Date());
  const [displayPayments, setDisplayPayments] = useState([]);
  const [createPaymentMode, setCreatePaymentMode] = useState(false);

  useEffect(() => dispatch(fetchPayments()), [dispatch]);

  useEffect(() => {
    const year = paymentsDate.getUTCFullYear().toString();
    const month = (paymentsDate.getUTCMonth() + 1).toString();
    const date = paymentsDate.getUTCDate().toString();
    const todayDateFormatted = `${year}-${
      "0".repeat(2 - month.length) + month
    }-${"0".repeat(2 - date.length) + date}`;

    const filteredPayments = paymentsState.payments.filter(
      (payment) => payment.date === todayDateFormatted
    );

    setDisplayPayments(filteredPayments);
  }, [paymentsState.payments, paymentsDate]);

  if (paymentsState.loading) return <Loader />;
  if (paymentsState.error) return <Error />;

  const create = (payment) => dispatch(createPayment(payment));
  const update = (id, payment) => dispatch(updatePayment(id, payment));
  const remove = (paymentId) => dispatch(deletePayment(paymentId));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          onClick={() => setCreatePaymentMode(true)}
        >
          <AddIcon />
        </Fab>

        <DatePicker
          label="Balance for:"
          date={paymentsDate}
          changeDate={(newDate) => setPaymentsDate(newDate)}
        />
      </div>

      <CreatePayment
        open={createPaymentMode}
        create={create}
        close={() => setCreatePaymentMode(false)}
      />

      <br />

      <PaymentList payments={displayPayments} remove={remove} update={update} />
    </div>
  );
};

export default Balance;
