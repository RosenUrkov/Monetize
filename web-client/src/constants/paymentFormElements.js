import { paymentTypes } from "./paymentTypes";
import { expenseCategories } from "./expenseCategories";
import { incomeCategories } from "./incomeCategories";
import { accountTypes } from "./accountTypes";

export const paymentFormElements = (basePayment) => {
  return {
    value: {
      name: "Value",
      placeholder: "Value",
      value: basePayment?.value || "",
      type: "text",
      validation: {
        required: true,
        isNumber: true,
      },
      valid: !!basePayment,
      touched: false,
    },
    type: {
      name: "Type",
      placeholder: "Type",
      value: basePayment?.type || "Expense",
      type: "select",
      getOptions() {
        return Object.keys(paymentTypes);
      },
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    category: {
      name: "Category",
      placeholder: "Category",
      value: basePayment?.category || "",
      type: "select",
      getOptions(paymentType) {
        return paymentType === "Expense"
          ? Object.keys(expenseCategories)
          : Object.keys(incomeCategories);
      },
      validation: {
        required: true,
      },
      valid: !!basePayment,
      touched: false,
    },
    account: {
      name: "Account",
      placeholder: "Account",
      value: basePayment?.account || "",
      type: "select",
      getOptions() {
        return Object.keys(accountTypes);
      },
      validation: {
        required: true,
      },
      valid: !!basePayment,
      touched: false,
    },
    date: {
      name: "Date",
      placeholder: "Date",
      value: basePayment?.date ? new Date(basePayment.date) : new Date(),
      type: "date",
      validation: {},
      valid: true,
      touched: false,
    },
  };
};
