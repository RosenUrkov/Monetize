import React, { useState } from "react";

const PaymentDetails = (props) => {
  const { id, value, date, type, category, account, remove, update } = props;

  return (
    <div>
      <div>{value}</div>
      <div>{date}</div>
      <div>{type}</div>
      <div>{category}</div>
      <div>{account}</div>

      <button onClick={remove}>Delete!</button>
    </div>
  );
};

export default PaymentDetails;
