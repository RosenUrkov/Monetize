import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { isInputValid } from "../../../common/validators";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { paymentTypes } from "../../../constants/paymentTypes";
import { expenseCategories } from "../../../constants/expenseCategories";
import { incomeCategories } from "../../../constants/incomeCategories";
import { accountTypes } from "../../../constants/accountTypes";
import Select from "../../UI/Select/Select";
import DatePicker from "../../UI/DatePicker/DatePicker";
import { formatDate } from "../../../common/formatDate";
import withToasts from "../../../hoc/withToasts";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentForm = (props) => {
  const { open, close, submit, basePayment } = props;

  const classes = useStyles();

  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
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
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
  });

  const handleInputChange = ({ name, value }) => {
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

  const submitHandler = (ev) => {
    const payment = {
      value: paymentForm.value.value,
      type: paymentForm.type.value,
      category: paymentForm.category.value,
      account: paymentForm.account.value,
      date: formatDate(paymentForm.date.value),
    };

    submit(payment);
  };

  const formElements = Object.keys(paymentForm)
    .map((name) => ({ name, config: paymentForm[name] }))
    .map(({ name, config }) => {
      const isValidClass = config.valid ? "valid" : "invalid";
      const isTouchedClass = config.touched ? "touched" : "untouched";
      const classes = [isValidClass, isTouchedClass].join(" ");

      if (config.type === "text") {
        return (
          <Grid item xs={12} sm={6} key={name} style={{ display: "flex" }}>
            <TextField
              id={name}
              name={name}
              className={classes}
              type={config.type}
              placeholder={config.placeholder}
              value={config.value}
              style={{ display: "flex", justifyContent: "flex-end" }}
              onChange={(ev) => handleInputChange(ev.target)}
              fullWidth
            />
          </Grid>
        );
      }
      if (config.type === "select") {
        return (
          <Grid item xs={12} sm={6} key={name}>
            <Select
              name={name}
              value={config.value}
              onChange={(ev) => handleInputChange(ev.target)}
              options={config.getOptions(paymentForm.type.value)}
            ></Select>
          </Grid>
        );
      }
      if (config.type === "date") {
        return (
          <Grid item xs={12} sm={6} key={name}>
            <DatePicker
              label="Payment for:"
              date={config.value}
              fullWidth={true}
              changeDate={(date) => (ev) =>
                handleInputChange({
                  name: config.name,
                  value: date,
                })}
            />
          </Grid>
        );
      }
    });

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Payment Form
            </Typography>
            <Button
              autoFocus
              color="inherit"
              disabled={!isFormValid}
              onClick={submitHandler}
            >
              SAVE
            </Button>
          </Toolbar>
        </AppBar>

        <br />

        <Grid container spacing={3}>
          {formElements}
        </Grid>
      </Dialog>
    </div>
  );
};

export default PaymentForm;
