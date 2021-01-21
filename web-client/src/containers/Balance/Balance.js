import React, { useEffect, useState } from "react";
import CreatePayment from "../../components/Payments/CreatePayment/CreatePayment";
import PaymentList from "../../components/Payments/PaymentList/PaymentList";
import httpProvider from "../../providers/http-provider";

const Balance = (props) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    httpProvider.get("payments").then((data) => {
      setPayments(data);
    });
  }, []);

  const create = (payment) => {
    httpProvider
      .post("payments", payment)
      .then((payment) => setPayments((prev) => [...prev, payment]))
      .catch(console.log);
  };

  const update = (id, payment) => {
    httpProvider
      .put(`payments/${id}`, payment)
      .then((payment) => {
        const index = payments.findIndex((x) => x.id === payment.id);
        const updatedPayments = [...payments];
        updatedPayments[index] = payment;

        setPayments(updatedPayments);
      })
      .catch(console.log);
  };

  const remove = (paymentId) => {
    httpProvider
      .delete(`payments/${paymentId}`)
      .then((payment) =>
        setPayments((prev) => prev.filter((x) => x.id !== payment.id))
      )
      .catch(console.log);
  };

  return (
    <div>
      <CreatePayment create={create} />
      <br />
      <PaymentList payments={payments} remove={remove} update={update} />
    </div>
  );
};

export default Balance;
