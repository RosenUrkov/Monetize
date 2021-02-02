import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MonetizationIcon from "@material-ui/icons/MonetizationOn";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import InsertChartIcon from "@material-ui/icons/InsertChart";

export const appRoutes = [
  {
    auth: true,
    icon: AccountBalanceWalletIcon,
    to: "/balance",
    text: "Balance",
  },
  {
    auth: true,
    icon: MonetizationIcon,
    to: "/budgets",
    text: "Budgets",
  },
  {
    auth: true,
    icon: InsertChartIcon,
    to: "/statistics",
    text: "Statistics",
  },
];

export const helperRoutes = [
  {
    auth: false,
    icon: PersonAddIcon,
    to: "/register",
    text: "Register",
  },
  {
    auth: false,
    icon: LockOpenIcon,
    to: "/login",
    text: "Login",
  },
  {
    auth: true,
    icon: ExitToAppIcon,
    to: "/login",
    text: "Logout",
  },
];
