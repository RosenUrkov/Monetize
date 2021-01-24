import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TodayIcon from "@material-ui/icons/Today";
import { paymentTypes } from "./paymentTypes";
import { accountTypes } from "./accountTypes";
import { expenseCategories } from "./expenseCategories";
import { incomeCategories } from "./incomeCategories";

export const paymentColumns = [
  {
    id: "value",
    label: "Value",
    minWidth: 100,
    format: (value) => Number(value).toFixed(2),
    getIcon: (label) => AttachMoneyIcon,
  },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    getIcon: (label) =>
      expenseCategories[label]?.icon || incomeCategories[label]?.icon,
  },
  {
    id: "type",
    label: "Type",
    minWidth: 100,
    getIcon: (label) => paymentTypes[label].icon,
  },
  {
    id: "account",
    label: "Account",
    minWidth: 100,
    getIcon: (label) => accountTypes[label].icon,
  },
];
