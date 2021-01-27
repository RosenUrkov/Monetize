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
import { budgetTypes } from "../../../constants/budgetTypes";
import DeleteIcon from "@material-ui/icons/Delete";

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

const createPaymentTemplate = (basePayment) => ({
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
});

const BudgetForm = (props) => {
  const { open, close, submit, baseBudget, freeBudgetTypes } = props;

  const classes = useStyles();

  const [isFormValid, setIsFormValid] = useState(false);
  const [budgetTypeElement, setBudgetTypeElement] = useState({
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
  });
  const [budgetPaymentsElements, setBudgetPaymentsElements] = useState(
    baseBudget ? baseBudget.payments.map((x) => createPaymentTemplate(x)) : []
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
          acc[curr] = x[curr].value;
          return acc;
        }, {})
      ),
    };

    submit(budget);
  };

  const addBudgetPayment = () => {
    const copyPayments = budgetPaymentsElements.slice();
    copyPayments.push(createPaymentTemplate());

    setBudgetPaymentsElements(copyPayments);
    setIsFormValid(false);
  };

  const removeBudgetPayment = (index) => {
    const copyPayments = budgetPaymentsElements.filter((_, i) => i !== index);
    setBudgetPaymentsElements(copyPayments);

    const formValid =
      budgetTypeElement.valid &&
      budgetPaymentsElements.every((x) =>
        Object.keys(x).every((y) => x[y].valid)
      );

    setIsFormValid(formValid);
  };

  const visualizeBudgetType = () => {
    const isValidClass = budgetTypeElement.valid ? "valid" : "invalid";
    const isTouchedClass = budgetTypeElement.touched ? "touched" : "untouched";
    const classes = [isValidClass, isTouchedClass].join(" ");

    return (
      <Select
        name={"type"}
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
    const classes = [isValidClass, isTouchedClass].join(" ");

    if (config.type === "text") {
      return (
        <Grid
          item
          xs={12}
          sm={4}
          key={index + name}
          style={{ display: "flex" }}
        >
          <TextField
            id={index + name}
            name={name}
            className={classes}
            type={config.type}
            placeholder={config.placeholder}
            value={config.value}
            style={{ display: "flex", justifyContent: "flex-end" }}
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
      console.log(config.getOptions(budgetPaymentsElements[index].type.value));

      return (
        <Grid item xs={12} sm={4} key={index + name}>
          <Select
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
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingBottom: 5,
          }}
        >
          <Grid container spacing={3} style={{ width: "95%" }}>
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
        <AppBar className={classes.appBar} color="secondary">
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

        {budgetTypeVisualization}

        <br />

        {paymentFormElementsVisualization}

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

export default BudgetForm;
