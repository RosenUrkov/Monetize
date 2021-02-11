import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../common/formatDate";
import NothingToShow from "../../components/Error/NothingToShow/NothingToShow";
import BarChart from "../../components/UI/Charts/BarChart/BarChart";
import PointChart from "../../components/UI/Charts/PointChart/PointChart";
import DatePicker from "../../components/UI/DatePicker/DatePicker";
import Loader from "../../components/UI/Loader/Loader";
import Select from "../../components/UI/Select/Select";
import { budgetTypes } from "../../constants/budgetTypes";
import withToasts from "../../hoc/withToasts";
import {
  fetchStatistics,
  statisticsHideMessage,
} from "../../store/actions/statistics";
import Dialog from "../../components/UI/Dialog/Dialog";
import {
  tutorialDescription,
  tutorialTitle,
} from "../../constants/paymentsToBudgetTutorial";

const useStyles = makeStyles((theme) => ({
  budgetTypeContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Statistics = (props) => {
  const { showToast } = props;

  const dispatch = useDispatch();
  const statisticsState = useSelector((state) => state.statistics);

  const classes = useStyles();

  const [statisticsStartDate, setStatisticsStartDate] = useState(new Date());
  const [statisticsBudgetType, setStatisticsBudgetType] = useState(
    budgetTypes.Day.name
  );

  const [shouldShowTutorial, setShouldShowTutorial] = useState(
    !localStorage.getItem("paymentsToBudgetTutorial")
  );

  const closeTutorial = () => {
    localStorage.setItem("paymentsToBudgetTutorial", "closed");
    setShouldShowTutorial(false);
  };

  useEffect(
    () =>
      dispatch(
        fetchStatistics(statisticsBudgetType, formatDate(statisticsStartDate))
      ),
    [dispatch, statisticsBudgetType, statisticsStartDate]
  );

  useEffect(() => {
    if (statisticsState.error) {
      showToast(statisticsState.error.message, "error");
      dispatch(statisticsHideMessage());
    }
  }, [dispatch, statisticsState.error, showToast]);

  if (statisticsState.loading) return <Loader />;

  return (
    <div>
      <div className={classes.budgetTypeContainer}>
        <Grid item xs={12} sm={4}>
          <Select
            name={"Budget type:"}
            value={statisticsBudgetType}
            onChange={(ev) => setStatisticsBudgetType(ev.target.value)}
            options={Object.keys(budgetTypes)}
          />
        </Grid>

        <DatePicker
          label="Statistics start date:"
          date={statisticsStartDate}
          changeDate={(newDate) => setStatisticsStartDate(newDate)}
          showSideControls
        />
      </div>

      <br />

      {(statisticsState.error ||
        (!statisticsState.paymentsOfDate?.length &&
          !statisticsState.paymentsToBudgetDifference?.length)) && (
        <NothingToShow />
      )}

      {!statisticsState.error && !!statisticsState.paymentsOfDate?.length && (
        <PointChart data={statisticsState.paymentsOfDate} title={"Payments"} />
      )}

      <br />

      {!statisticsState.error &&
        !!statisticsState.paymentsToBudgetDifference?.length && (
          <>
            <Dialog
              open={shouldShowTutorial}
              close={closeTutorial}
              title={tutorialTitle}
              description={tutorialDescription}
            />

            <BarChart
              data={statisticsState.paymentsToBudgetDifference}
              title={"Payments to Budget"}
            />
          </>
        )}
    </div>
  );
};

export default withToasts(Statistics);
