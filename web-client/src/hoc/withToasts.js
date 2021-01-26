import { Fragment, useCallback, useState } from "react";
import Toast from "../components/UI/Toast/Toast";

const withToasts = (Component) => (props) => {
  const [toast, setToast] = useState({
    open: false,
    message: null,
    type: null,
  });

  const showToast = useCallback(
    (message, type) => setToast({ open: true, message, type }),
    []
  );
  const closeToast = useCallback(
    () => setToast((prev) => ({ ...prev, open: false })),
    []
  );

  return (
    <Fragment>
      <Component {...props} showToast={showToast} />
      <Toast {...toast} close={closeToast} />
    </Fragment>
  );
};

export default withToasts;
