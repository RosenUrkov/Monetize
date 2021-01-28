import { paymentTypes } from "./paymentTypes";
import { expenseCategories } from "./expenseCategories";
import { incomeCategories } from "./incomeCategories";

export const budgetTypeFormElement = (baseBudget, freeBudgetTypes) => {
  return {
    name: "type",
    placeholder: "budget type",
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
    name: "value",
    placeholder: "value",
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
