import httpProvider from "../../common/httpProvider";
import {
  STATISTICS_HIDE_MESSAGE,
  STATISTICS_REQUEST_FAIL,
  STATISTICS_REQUEST_START,
  FETCH_STATISTICS_SUCCESS,
} from "../actionTypes";

const statisticsRequestStart = () => {
  return {
    type: STATISTICS_REQUEST_START,
  };
};

const statisticsRequestFail = (error) => {
  return {
    type: STATISTICS_REQUEST_FAIL,
    error,
  };
};

const fetchStatisticsSuccess = (statistics) => {
  return {
    type: FETCH_STATISTICS_SUCCESS,
    paymentsOfDate: statistics.paymentsOfDate,
    paymentsToBudgetDifference: statistics.paymentsToBudgetDifference,
  };
};

export const statisticsHideMessage = () => {
  return {
    type: STATISTICS_HIDE_MESSAGE,
  };
};

export const fetchStatistics = (budgetType, startDate) => {
  return (dispatch) => {
    dispatch(statisticsRequestStart());

    httpProvider
      .get(`statistics?budgetType=${budgetType}&startDate=${startDate}`)
      .then((res) => {
        dispatch(fetchStatisticsSuccess(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(statisticsRequestFail(error.response.data));
      });
  };
};
