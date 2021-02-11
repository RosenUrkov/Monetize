import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { isInputValid } from "../../../common/validators";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "../../UI/Select/Select";
import DeleteIcon from "@material-ui/icons/Delete";
import Transition from "../../UI/Transition/Transition";
import {
  budgetPaymentFormElement,
  budgetTypeFormElement,
} from "../../../constants/budgetFormElements";
import withToasts from "../../../hoc/withToasts";
import PropTypes from "prop-types";
import { formatDate } from "../../../common/formatDate";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  outerPaymentsContainer: {
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: 5,
  },
  innerPaymentsContainer: {
    width: "95%",
  },
  textInputContainer: {
    display: "flex",
  },
  textInput: {
    display: "flex",
    justifyContent: "flex-end",
  },
  elementsContainer: {
    width: "98%",
    alignSelf: "center",
  },
}));

const BudgetForm = (props) => {
  const { open, close, submit, baseBudget, freeBudgetTypes, showToast } = props;

  const styleClasses = useStyles();

  const [isFormValid, setIsFormValid] = useState(false);
  const [budgetTypeElement, setBudgetTypeElement] = useState(
    budgetTypeFormElement(baseBudget, freeBudgetTypes)
  );
  const [budgetPaymentsElements, setBudgetPaymentsElements] = useState(
    baseBudget
      ? baseBudget.payments.map((x) => budgetPaymentFormElement(x))
      : []
  );

  const handleBudgetTypeInputChange = (value) => {
    const copyBudgetInput = { ...budgetTypeElement };

    copyBudgetInput.value = value;
    copyBudgetInput.touched = true;
    copyBudgetInput.valid = isInputValid(value, copyBudgetInput.validation);

    setBudgetTypeElement(copyBudgetInput);

    const formValid =
      copyBudgetInput.valid &&
      budgetPaymentsElements.every((x) =>
        Object.keys(x).every((y) => x[y].valid)
      );

    setIsFormValid(formValid);
  };

  const handlePaymentElementInputChange = ({ identifier, value }) => {
    const { name, index } = identifier;

    if (
      name === "category" &&
      budgetPaymentsElements.some((x) => x.category.value === value)
    ) {
      return showToast(
        "You must only add payments with unique categories!",
        "error"
      );
    }

    const copyPayments = budgetPaymentsElements.slice();
    const copyPayment = copyPayments[index];
    const updatedControl = { ...copyPayment[name] };

    updatedControl.value = value;
    updatedControl.touched = true;
    updatedControl.valid = isInputValid(value, updatedControl.validation);

    copyPayment[name] = updatedControl;
    copyPayments[index] = copyPayment;
    setBudgetPaymentsElements(copyPayments);

    const formValid =
      budgetTypeElement.valid &&
      copyPayments.every((x) => Object.keys(x).every((y) => x[y].valid));

    setIsFormValid(formValid);
  };

  const submitHandler = (ev) => {
    const budget = {
      type: budgetTypeElement.value,
      payments: budgetPaymentsElements.map((x) =>
        Object.keys(x).reduce((acc, curr) => {
          if (curr === "value") {
            acc[curr] = Number.parseFloat(x[curr].value).toFixed(2);
          } else {
            acc[curr] = x[curr].value;
          }

          return acc;
        }, {})
      ),
    };

    submit(budget);
  };

  const addBudgetPayment = () => {
    const copyPayments = budgetPaymentsElements.slice();
    copyPayments.push(budgetPaymentFormElement());

    setBudgetPaymentsElements(copyPayments);
    setIsFormValid(false);
  };

  const removeBudgetPayment = (index) => {
    const copyPayments = budgetPaymentsElements.filter((_, i) => i !== index);
    setBudgetPaymentsElements(copyPayments);

    const formValid =
      budgetTypeElement.valid &&
      copyPayments.every((x) => Object.keys(x).every((y) => x[y].valid));

    setIsFormValid(formValid);
  };

  const visualizeBudgetType = () => {
    const isValidClass = budgetTypeElement.valid ? "valid" : "invalid";
    const isTouchedClass = budgetTypeElement.touched ? "touched" : "untouched";
    const classes = [isValidClass, isTouchedClass].join(" ");

    return (
      <Select
        className={classes}
        name={"Type"}
        value={budgetTypeElement.value}
        onChange={(ev) => handleBudgetTypeInputChange(ev.target.value)}
        options={budgetTypeElement.getOptions()}
      ></Select>
    );
  };

  const visualizePaymentFormElement = ({ identifier, config }) => {
    const { index, name } = identifier;

    const isValidClass = config.valid ? "valid" : "invalid";
    const isTouchedClass = config.touched ? "touched" : "untouched";
    const classes = [isValidClass, isTouchedClass, styleClasses.textInput].join(
      " "
    );

    if (config.type === "text") {
      return (
        <Grid
          item
          xs={12}
          sm={4}
          key={index + name}
          className={styleClasses.textInputContainer}
        >
          <TextField
            id={index + name}
            autoComplete="off"
            name={name}
            className={classes}
            type={config.type}
            placeholder={name}
            value={config.value}
            onChange={(ev) =>
              handlePaymentElementInputChange({
                identifier,
                value: ev.target.value,
              })
            }
            fullWidth
          />
        </Grid>
      );
    }
    if (config.type === "select") {
      return (
        <Grid item xs={12} sm={4} key={index + name}>
          <Select
            className={classes}
            name={name}
            value={config.value}
            onChange={(ev) =>
              handlePaymentElementInputChange({
                identifier,
                value: ev.target.value,
              })
            }
            options={config.getOptions(
              budgetPaymentsElements[index].type.value
            )}
          ></Select>
        </Grid>
      );
    }
  };

  const budgetTypeVisualization = visualizeBudgetType();
  const paymentFormElementsVisualization = budgetPaymentsElements.map(
    (payment, index) => {
      const visualized = Object.keys(payment)
        .map((name) => ({
          identifier: { index, name },
          config: budgetPaymentsElements[index][name],
        }))
        .map(visualizePaymentFormElement);

      return (
        <div key={index} className={styleClasses.outerPaymentsContainer}>
          <Grid
            container
            spacing={3}
            className={styleClasses.innerPaymentsContainer}
          >
            {visualized}
          </Grid>

          <IconButton
            style={{ paddingBottom: 0 }}
            onClick={() => removeBudgetPayment(index)}
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        </div>
      );
    }
  );

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={styleClasses.appBar} color="secondary">
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
              Budget Form
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

        <div className={styleClasses.elementsContainer}>
          {budgetTypeVisualization}

          <br />

          {paymentFormElementsVisualization}
        </div>

        <br />

        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ alignSelf: "center" }}
          onClick={addBudgetPayment}
        >
          Add Budget Payment
        </Button>
      </Dialog>
    </div>
  );
};

BudgetForm.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  baseBudget: PropTypes.object,
  freeBudgetTypes: PropTypes.array.isRequired,
};

export default withToasts(BudgetForm);
