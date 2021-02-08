import { paymentTypes } from "./paymentTypes";
import { expenseCategories } from "./expenseCategories";
import { incomeCategories } from "./incomeCategories";

export const budgetTypeFormElement = (baseBudget, freeBudgetTypes) => {
  return {
    name: "Type",
    placeholder: "Budget type",
    value: baseBudget?.type || "",
    type: "select",
    getOptions() {
      return baseBudget
        ? [...freeBudgetTypes, baseBudget.type]
        : freeBudgetTypes;
    },
    validation: {
      required: true,
    },
    valid: !!baseBudget?.type,
    touched: false,
  };
};

export const budgetPaymentFormElement = (basePayment) => ({
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
    getOptions: (paymentType) => {
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
});
