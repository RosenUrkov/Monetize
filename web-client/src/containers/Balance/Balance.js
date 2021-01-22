import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePayment from "../../components/Payments/CreatePayment/CreatePayment";
import PaymentList from "../../components/Payments/PaymentList/PaymentList";
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";
import {
  createPayment,
  deletePayment,
  fetchPayments,
  updatePayment,
} from "../../store/actions/payments";

const Balance = (props) => {
  const dispatch = useDispatch();
  const paymentsState = useSelector((state) => state.payments);

  useEffect(() => dispatch(fetchPayments()), [dispatch]);

  if (paymentsState.loading) return <Loader />;
  if (paymentsState.error) return <Error />;

  const create = (payment) => dispatch(createPayment(payment));
  const update = (id, payment) => dispatch(updatePayment(id, payment));
  const remove = (paymentId) => dispatch(deletePayment(paymentId));

  return (
    <div>
      <CreatePayment create={create} />
      <br />
      <PaymentList
        payments={paymentsState.payments}
        remove={remove}
        update={update}
      />
    </div>
  );
};

export default Balance;
