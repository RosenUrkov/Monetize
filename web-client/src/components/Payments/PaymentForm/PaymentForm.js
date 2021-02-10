import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { isInputValid } from "../../../common/validators";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "../../UI/Select/Select";
import DatePicker from "../../UI/DatePicker/DatePicker";
import { formatDate } from "../../../common/formatDate";
import withToasts from "../../../hoc/withToasts";
import { paymentFormElements } from "../../../constants/paymentFormElements";
import Transition from "../../UI/Transition/Transition";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textInputContainer: {
    display: "flex",
  },
  textInput: {
    display: "flex",
    justifyContent: "flex-end",
  },
  elementsContainer: {
    width: "100%",
    alignSelf: "center",
  },
}));

const PaymentForm = (props) => {
  const { open, close, submit, basePayment } = props;

  const styleClasses = useStyles();

  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentForm, setPaymentForm] = useState(
    paymentFormElements(basePayment)
  );

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
      value: Number.parseFloat(paymentForm.value.value).toFixed(2),
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
      const classes = [
        isValidClass,
        isTouchedClass,
        styleClasses.textInput,
      ].join(" ");

      if (config.type === "text") {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            key={name}
            className={styleClasses.textInputContainer}
          >
            <TextField
              id={name}
              autoComplete="off"
              name={name}
              className={classes}
              type={config.type}
              placeholder={name}
              value={config.value}
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
              changeDate={(date) =>
                handleInputChange({
                  name,
                  value: date,
                })
              }
            />
          </Grid>
        );
      }
    });

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar className={styleClasses.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={styleClasses.title}>
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

      <Grid container spacing={3} className={styleClasses.elementsContainer}>
        {formElements}
      </Grid>
    </Dialog>
  );
};

PaymentForm.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  basePayment: PropTypes.object,
};

export default PaymentForm;
