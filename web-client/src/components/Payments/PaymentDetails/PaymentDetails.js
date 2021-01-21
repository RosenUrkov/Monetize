import React, { useState } from "react";
import CreatePayment from "../CreatePayment/CreatePayment";

const PaymentDetails = (props) => {
  const { id, value, date, type, category, account, remove, update } = props;

  const [updateMode, setUpdateMode] = useState(false);

  const submitUpdate = (data) => {
    update(data);
    setUpdateMode(false);
  };

  return (
    <div>
      {!updateMode && (
        <div>
          <div>{value}</div>
          <div>{date}</div>
          <div>{type}</div>
          <div>{category}</div>
          <div>{account}</div>

          <button onClick={remove}>Delete!</button>
        </div>
      )}

      {updateMode && <CreatePayment create={submitUpdate} {...props} />}

      <button onClick={() => setUpdateMode((prev) => !prev)}>
        Change Update Mode
      </button>
    </div>
  );
};

export default PaymentDetails;
