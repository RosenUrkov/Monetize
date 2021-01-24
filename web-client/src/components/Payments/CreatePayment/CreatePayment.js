import React, { forwardRef, useState } from "react";
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

const CreatePayment = (props) => {
  const classes = useStyles();

  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    value: {
      name: "value",
      placeholder: "value",
      value: "",
      type: "text",
      validation: {
        // required: true,
      },
      valid: false,
      touched: false,
    },
    type: {
      name: "type",
      placeholder: "type",
      value: "Expense",
      type: "select",
      getOptions() {
        return Object.keys(paymentTypes);
      },
      validation: {
        // required: true,
      },
      valid: true,
      touched: false,
    },
    category: {
      name: "category",
      placeholder: "category",
      value: "",
      type: "select",
      getOptions(paymentType) {
        return paymentType === "Expense"
          ? Object.keys(expenseCategories)
          : Object.keys(incomeCategories);
      },
      validation: {
        // required: true,
      },
      valid: false,
      touched: false,
    },
    account: {
      name: "account",
      placeholder: "account",
      value: "",
      type: "select",
      getOptions() {
        return Object.keys(accountTypes);
      },
      validation: {
        // required: true,
      },
      valid: false,
      touched: false,
    },
    date: {
      name: "date",
      placeholder: "date",
      value: new Date(),
      type: "date",
      validation: {
        // required: true,
      },
      valid: true,
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
    const payment = {
      value: paymentForm.value.value,
      type: paymentForm.type.value,
      category: paymentForm.category.value,
      account: paymentForm.account.value,
      date: "2021-01-24",
    };

    props.create(payment);
    props.close();
  };

  const formElements = Object.keys(paymentForm)
    .map((name) => ({ name, config: paymentForm[name] }))
    .map(({ name, config }) => {
      const isValidClass = config.valid ? "valid" : "invalid";
      const isTouchedClass = config.touched ? "touched" : "untouched";
      const classes = [isValidClass, isTouchedClass].join(" ");

      if (config.type === "text") {
        return (
          <Grid item xs={12} sm={6} key={name}>
            <TextField
              id={name}
              name={name}
              className={classes}
              type={config.type}
              placeholder={config.placeholder}
              value={config.value}
              onChange={handleInputChange}
              style={{ minWidth: 500 }}
              // fullWidth
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
              onChange={handleInputChange}
              options={config.getOptions(paymentForm.type.value)}
            ></Select>
          </Grid>
        );
      }
      if (config.type === "date") {
        return (
          <Grid item xs={12} sm={12} key={name}>
            <DatePicker
              style={{ minWidth: 500 }}
              label="Payment for:"
              date={config.value}
              changeDate={(date) =>
                handleInputChange({
                  target: { name: config.name, value: date },
                })
              }
            />
          </Grid>
        );
      }
    });

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create Payment
            </Typography>
            <Button
              autoFocus
              color="inherit"
              disabled={!isFormValid}
              onClick={createHandler}
            >
              SAVE
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3}>
          {formElements}
        </Grid>
      </Dialog>
    </div>
  );
};

export default CreatePayment;
