import "date-fns";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";

const TextFieldComponent = (props) => {
  return <TextField {...props} disabled={true} />;
};

const DatePicker = (props) => {
  const { label, date, changeDate, fullWidth } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        format="yyyy-MM-dd"
        label={label}
        value={date}
        onChange={(date) => changeDate(date)}
        fullWidth={fullWidth}
        TextFieldComponent={TextFieldComponent}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
