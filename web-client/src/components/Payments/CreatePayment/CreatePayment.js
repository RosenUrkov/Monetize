import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isInputValid } from "../../../common/validators";
import "./CreatePayment.css";

const CreatePayment = (props) => {
  const { create } = props;

  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    value: {
      name: "value",
      placeholder: "value",
      value: "",
      type: "text",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    type: {
      name: "type",
      placeholder: "type",
      value: "",
      type: "text",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    category: {
      name: "category",
      placeholder: "category",
      value: "",
      type: "text",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    account: {
      name: "account",
      placeholder: "account",
      value: "",
      type: "text",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    date: {
      name: "date",
      placeholder: "date",
      value: "",
      type: "date",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedControl = { ...paymentForm[name] };

    updatedControl.value = value;
    updatedControl.touched = true;
    updatedControl.valid = isInputValid(value, updatedControl.validation);

    const updatedForm = { ...paymentForm, [name]: updatedControl };
    setPaymentForm(updatedForm);

    const formValid = Object.values(updatedForm).every(
      (control) => control.valid
    );
    setIsFormValid(formValid);
  };

  const createHandler = (ev) => {
    ev.preventDefault();

    const payment = {
      value: paymentForm.value.value,
      type: paymentForm.type.value,
      category: paymentForm.category.value,
      account: paymentForm.account.value,
      date: paymentForm.date.value,
    };

    create(payment);
  };

  const formElements = Object.keys(paymentForm)
    .map((name) => ({ name, config: paymentForm[name] }))
    .map(({ name, config }) => {
      const isValidClass = config.valid ? "valid" : "invalid";
      const isTouchedClass = config.touched ? "touched" : "untouched";
      const classes = [isValidClass, isTouchedClass].join(" ");

      return (
        <input
          type={config.type}
          key={name}
          name={name}
          className={classes}
          placeholder={config.placeholder}
          value={config.value}
          onChange={handleInputChange}
        />
      );
    });

  return (
    <form onSubmit={createHandler}>
      <h3>Create Payment</h3>
      {formElements}
      <button type="submit" disabled={!isFormValid}>
        Submit!
      </button>
    </form>
  );
};

export default CreatePayment;
