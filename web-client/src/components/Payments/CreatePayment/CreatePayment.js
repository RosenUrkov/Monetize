import React, { useState } from "react";

const CreatePayment = (props) => {
  const { id, value, date, type, category, account, create } = props;

  const [typeInput, setType] = useState(type || "");
  const [valueInput, setValue] = useState(value || "");
  const [categoryInput, setCategory] = useState(category || "");
  const [accountInput, setAccount] = useState(account || "");
  const [dateInput, setDate] = useState(date || "");

  const createPayment = () => {
    const payment = {
      value: valueInput,
      type: typeInput,
      category: categoryInput,
      account: accountInput,
      date: dateInput,
    };

    setType("");
    setValue("");
    setCategory("");
    setAccount("");
    setDate("");

    create(payment);
  };

  return (
    <div>
      <div>
        <label>Type:</label>
        <input
          type="text"
          value={typeInput}
          onChange={(x) => setType(x.target.value)}
        />
      </div>
      <div>
        <label>Value:</label>
        <input
          type="text"
          value={valueInput}
          onChange={(x) => setValue(x.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={categoryInput}
          onChange={(x) => setCategory(x.target.value)}
        />
      </div>
      <div>
        <label>Account:</label>
        <input
          type="text"
          value={accountInput}
          onChange={(x) => setAccount(x.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={dateInput}
          onChange={(x) => setDate(x.target.value)}
        />
      </div>

      <button onClick={createPayment}>Submit!</button>
    </div>
  );
};

export default CreatePayment;
