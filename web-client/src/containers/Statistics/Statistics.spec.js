import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import * as mockRedux from "react-redux";
import Statistics from "./Statistics.js";

// components
jest.mock("../../components/UI/Select/Select", () => {
  return (props) => (
    <div id="mock-select" onClick={() => props.onChange(props.value)}>
      Mock Select
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

jest.mock("../../components/Error/NothingToShow/NothingToShow.js", () => {
  return (props) => <div id="mock-nothingtoshow">Mock Nothing To Show</div>;
});

jest.mock("../../components/UI/Charts/PointChart/PointChart", () => {
  return (props) => <div id="mock-pointchart">Mock PointChart</div>;
});

jest.mock("../../components/UI/Charts/BarChart/BarChart", () => {
  return (props) => <div id="mock-barchart">Mock BarChart</div>;
});

// dependencies
jest.mock("../../hoc/withToasts.js", () => {
  return (Component) => Component;
});

jest.mock("react-redux", () => {
  return {
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

//tests
describe("Statistics Tests", () => {
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

    const statisticsState = {
      paymentsOfDate: [],
      paymentsToBudgetDifference: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => statisticsState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Statistics showToast={showToastMock} />, container);
    });

    // Assert
    expect(container).toBeDefined();

    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the Select component", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const statisticsState = {
      paymentsOfDate: [],
      paymentsToBudgetDifference: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => statisticsState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Statistics showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-select").textContent).toBe(
      "Mock Select"
    );

    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the DatePicker component", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const statisticsState = {
      paymentsOfDate: [],
      paymentsToBudgetDifference: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => statisticsState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Statistics showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-datepicker").textContent).toBe(
      "Mock DatePicker"
    );

    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the PointChart component if there is no error and there are payments of date", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const statisticsState = {
      paymentsOfDate: [{}],
      paymentsToBudgetDifference: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => statisticsState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Statistics showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-pointchart").textContent).toBe(
      "Mock PointChart"
    );

    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the BarChart component if there is no error and there are payments to budget", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const statisticsState = {
      paymentsOfDate: [],
      paymentsToBudgetDifference: [{}],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => statisticsState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Statistics showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-barchart").textContent).toBe(
      "Mock BarChart"
    );

    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the NothingToShow component if there is no payments of date and payments to budget", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const statisticsState = {
      paymentsOfDate: [],
      paymentsToBudgetDifference: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => statisticsState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Statistics showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-nothingtoshow").textContent).toBe(
      "Mock Nothing To Show"
    );

    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the NothingToShow component if there is an error", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const statisticsState = {
      paymentsOfDate: [{}],
      paymentsToBudgetDifference: [{}],
      message: null,
      error: { message: "error" },
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => statisticsState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Statistics showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-nothingtoshow").textContent).toBe(
      "Mock Nothing To Show"
    );

    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the loader component if the loading state is true", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const statisticsState = {
      paymentsOfDate: [],
      paymentsToBudgetDifference: [],
      message: null,
      error: null,
      loading: true,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => statisticsState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Statistics showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-loader").textContent).toBe(
      "Mock Loader"
    );

    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });

  it("Should render the toast component if there is an error", async () => {
    // Arrange
    const showToastMock = jest.fn();

    const statisticsState = {
      paymentsOfDate: [],
      paymentsToBudgetDifference: [],
      message: null,
      error: { message: "error" },
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => statisticsState);

    const mockDate = new Date(2020, 10, 15);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    // Act
    await act(async () => {
      render(<Statistics showToast={showToastMock} />, container);
    });

    // Assert
    expect(showToastMock).toBeCalledWith(
      statisticsState.error.message,
      "error"
    );
    expect(showToastMock).toBeCalledTimes(1);

    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
    global.Date.mockRestore();
  });
});
