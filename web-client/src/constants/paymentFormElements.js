import { paymentTypes } from "./paymentTypes";
import { expenseCategories } from "./expenseCategories";
import { incomeCategories } from "./incomeCategories";
import { accountTypes } from "./accountTypes";

export const paymentFormElements = (basePayment) => {
  return {
    value: {
      name: "value",
      placeholder: "value",
      value: basePayment?.value || "",
      type: "text",
      validation: {
        required: true,
      },
      valid: !!basePayment,
      touched: false,
    },
    type: {
      name: "type",
      placeholder: "type",
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
      name: "category",
      placeholder: "category",
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
      name: "account",
      placeholder: "account",
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
      name: "date",
      placeholder: "date",
      value: basePayment?.date ? new Date(basePayment.date) : new Date(),
      type: "date",
      validation: {},
      valid: true,
      touched: false,
    },
  };
};
