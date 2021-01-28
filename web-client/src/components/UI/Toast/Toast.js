import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const Toast = (props) => {
  const { open, close, message, type } = props;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={close}>
      <MuiAlert elevation={6} variant="filled" onClose={close} severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Toast;
