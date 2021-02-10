import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import Balance from "./Balance";
import * as mockRedux from "react-redux";
import useCreateAndUpdateFormControlMock from "../../hooks/useCreateAndUpdateFormControl.js";

// components
jest.mock("@material-ui/core/Fab", () => {
  return (props) => (
    <div id="mock-fab" onClick={props.onClick}>
      Mock Fab
    </div>
  );
});

jest.mock("../../components/UI/DatePicker/DatePicker", () => {
  return (props) => (
    <div id="mock-datepicker" onClick={() => props.changeDate(props.date)}>
      Mock DatePicker
    </div>
  );
});

jest.mock("../../components/UI/Loader/Loader", () => {
  return (props) => <div id="mock-loader">Mock Loader</div>;
});

jest.mock("../../components/Payments/PaymentForm/PaymentForm", () => {
  return (props) => (
    <div id="mock-paymentform" onClick={() => props.submit("submitted")}>
      Mock PaymentForm
    </div>
  );
});

jest.mock("../../components/UI/Table/Table", () => {
  return (props) => (
    <div id="mock-table" onClick={props.update}>
      Mock Table
    </div>
  );
});

// dependencies
jest.mock("../../hoc/withToasts.js", () => {
  return (Component) => Component;
});

jest.mock("../../hooks/useCreateAndUpdateFormControl.js", () => {
  return jest.fn();
});

jest.mock("react-redux", () => {
  return {
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

//tests
describe("Balance Tests", () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("Should be defined", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    // Assert
    expect(container).toBeDefined();

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the Fab material component", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-fab").textContent).toBe("Mock Fab");

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the DatePicker component", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-datepicker").textContent).toBe(
      "Mock DatePicker"
    );

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the Table component", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-table").textContent).toBe(
      "Mock Table"
    );

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should not render the PaymentForm component when the showForm is false", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-paymentform")).toBe(null);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the PaymentForm component when the showForm is true", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: true,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-paymentform").textContent).toBe(
      "Mock PaymentForm"
    );

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should show toast if the paymentState has a message", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: "message",
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    // Assert
    expect(showToastMock).toBeCalledWith(balanceState.message, "success");
    expect(showToastMock).toBeCalledTimes(1);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should show toast if the paymentState has an error", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: { message: "error" },
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    // Assert
    expect(showToastMock).toBeCalledWith(balanceState.error.message, "error");
    expect(showToastMock).toBeCalledTimes(1);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should show loader if the paymentState has the loading true", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: true,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-loader").textContent).toBe(
      "Mock Loader"
    );

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should call startCreate when Fab calls onClick", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    const fabComponent = document.getElementById("mock-fab");

    await act(async () => {
      fabComponent.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Assert
    expect(createAndUpdateFormControlData.startCreate).toBeCalledTimes(1);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should call startUpdate when Table calls update", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: false,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    const tableComponent = document.getElementById("mock-table");

    await act(async () => {
      tableComponent.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Assert
    expect(createAndUpdateFormControlData.startUpdate).toBeCalledTimes(1);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should call finishCreate when PaymentForm calls submit if the entityToUpdate is null", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const createAndUpdateFormControlData = {
      entityToUpdate: null,
      showForm: true,
      openForm: false,
      startCreate: jest.fn(),
      startUpdate: jest.fn(),
      finishCreate: jest.fn(),
      finishUpdate: jest.fn(),
      cancelForm: jest.fn(),
    };

    useCreateAndUpdateFormControlMock.mockImplementation(
      () => createAndUpdateFormControlData
    );

    const balanceState = {
      payments: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => balanceState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Balance showToast={showToastMock} />, container);
    });

    const paymentFormComponent = document.getElementById("mock-paymentform");

    await act(async () => {
      paymentFormComponent.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    // Assert
    expect(createAndUpdateFormControlData.finishCreate).toBeCalledTimes(1);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });
});
