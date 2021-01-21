import React, { useState } from "react";

const CreateBudget = (props) => {
  const {
    id,
    type,
    paymentCategory,
    paymentValue,
    paymentType,
    create,
  } = props;

  const [typeInput, setType] = useState(type || "");
  const [paymentValueInput, setPaymentValue] = useState(paymentValue || "");
  const [paymentTypeInput, setPaymentType] = useState(paymentType || "");
  const [paymentCategoryInput, setPaymentCategory] = useState(
    paymentCategory || ""
  );

  const createBudget = () => {
    const budget = {
      type: typeInput,
      payments: [
        {
          value: paymentValueInput,
          type: paymentTypeInput,
          category: paymentCategoryInput,
        },
      ],
    };

    setType("");
    setPaymentValue("");
    setPaymentCategory("");
    setPaymentType("");

    create(budget);
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
        <label>Payment Value:</label>
        <input
          type="text"
          value={paymentValueInput}
          onChange={(x) => setPaymentValue(x.target.value)}
        />
      </div>
      <div>
        <label>Payment Category:</label>
        <input
          type="text"
          value={paymentCategoryInput}
          onChange={(x) => setPaymentCategory(x.target.value)}
        />
      </div>
      <div>
        <label>Payment Type:</label>
        <input
          type="text"
          value={paymentTypeInput}
          onChange={(x) => setPaymentType(x.target.value)}
        />
      </div>

      <button onClick={createBudget}>Submit!</button>
    </div>
  );
};

export default CreateBudget;
