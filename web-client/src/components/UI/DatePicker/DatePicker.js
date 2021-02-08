import "date-fns";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { IconButton } from "@material-ui/core";

const TextFieldComponent = (props) => {
  return <TextField {...props} disabled={true} />;
};

const DatePicker = (props) => {
  const { label, date, changeDate, fullWidth, showSideControls } = props;

  const handlePrevDay = () => {
    const copyDate = new Date(date.getTime());
    copyDate.setUTCDate(copyDate.getUTCDate() - 1);

    changeDate(copyDate);
  };

  const handleNextDay = () => {
    const copyDate = new Date(date.getTime());
    copyDate.setUTCDate(copyDate.getUTCDate() + 1);

    changeDate(copyDate);
  };

  return (
    <div>
      {showSideControls && (
        <IconButton onClick={handlePrevDay}>
          <ChevronLeftIcon />
        </IconButton>
      )}

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

      {showSideControls && (
        <IconButton onClick={handleNextDay}>
          <ChevronRightIcon />
        </IconButton>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  changeDate: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  showSideControls: PropTypes.bool,
};

export default DatePicker;
