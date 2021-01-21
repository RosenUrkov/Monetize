import React, { Fragment } from "react";
import PaymentDetails from "../PaymentDetails/PaymentDetails";

const PaymentList = (props) => {
  const { payments, remove, update } = props;

  return (
    <div>
      {payments &&
        payments.map((payment) => (
          <Fragment key={payment.id}>
            <PaymentDetails
              {...payment}
              remove={() => remove(payment.id)}
              update={(data) => update(payment.id, data)}
            />
            <br />
          </Fragment>
        ))}
    </div>
  );
};

export default PaymentList;
