import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

export default Toast;
