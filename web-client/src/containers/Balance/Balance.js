import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "../../components/Payments/PaymentForm/PaymentForm";
import Loader from "../../components/UI/Loader/Loader";
import {
  createPayment,
  deletePayment,
  fetchPayments,
  paymentsHideMessage,
  updatePayment,
} from "../../store/actions/payments";
import DatePicker from "../../components/UI/DatePicker/DatePicker";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { formatDate } from "../../common/formatDate";
import withToasts from "../../hoc/withToasts";
import useCreateAndUpdateFormControl from "../../hooks/useCreateAndUpdateFormControl";
import Table from "../../components/UI/Table/Table";
import { paymentColumns } from "../../constants/paymentColumns";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbarHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  addButton: {
    alignSelf: "center",
  },
}));

const Balance = (props) => {
  const { showToast } = props;

  const dispatch = useDispatch();
  const paymentsState = useSelector((state) => state.payments);

  const classes = useStyles();

  const [paymentsDate, setPaymentsDate] = useState(new Date());
  const [displayPayments, setDisplayPayments] = useState([]);

  const {
    entityToUpdate,
    showForm,
    openForm,
    startCreate,
    startUpdate,
    finishCreate,
    finishUpdate,
    cancelForm,
  } = useCreateAndUpdateFormControl(createPayment, updatePayment);

  useEffect(() => dispatch(fetchPayments()), [dispatch]);

  useEffect(() => {
    const paymentsDateFormatted = formatDate(paymentsDate);
    const filteredPayments = paymentsState.payments.filter(
      (payment) => payment.date === paymentsDateFormatted
    );

    setDisplayPayments(filteredPayments);
  }, [paymentsState.payments, paymentsDate]);

  useEffect(() => {
    if (paymentsState.message) {
      showToast(paymentsState.message, "success");
      dispatch(paymentsHideMessage());
    }
  }, [dispatch, paymentsState.message, showToast]);

  useEffect(() => {
    if (paymentsState.error) {
      showToast(paymentsState.error.message, "error");
      dispatch(paymentsHideMessage());
    }
  }, [dispatch, paymentsState.error, showToast]);

  if (paymentsState.loading) return <Loader />;

  const remove = (paymentId) => dispatch(deletePayment(paymentId));

  return (
    <div>
      <div className={classes.toolbarHeader}>
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          className={classes.addButton}
          onClick={startCreate}
        >
          <AddIcon />
        </Fab>

        <DatePicker
          label="Balance for:"
          date={paymentsDate}
          changeDate={(newDate) => setPaymentsDate(newDate)}
          showSideControls
        />
      </div>

      {showForm && (
        <PaymentForm
          open={openForm}
          basePayment={entityToUpdate}
          submit={entityToUpdate ? finishUpdate : finishCreate}
          close={cancelForm}
        />
      )}

      <br />

      <Table
        columns={paymentColumns}
        data={displayPayments}
        pagination={true}
        update={startUpdate}
        remove={remove}
      />
    </div>
  );
};

export default withToasts(Balance);
