import "date-fns";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = (props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        format="yyyy-MM-dd"
        label={props.label}
        value={props.date}
        onChange={(date) => props.changeDate(date)}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
