import "date-fns";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = (props) => {
  const { label, date, changeDate } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        format="yyyy-MM-dd"
        label={label}
        value={date}
        onChange={(date) => changeDate(date)}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
