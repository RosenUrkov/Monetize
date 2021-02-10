import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import * as mockRedux from "react-redux";
import useCreateAndUpdateFormControlMock from "../../hooks/useCreateAndUpdateFormControl.js";
import Budget from "./Budget.js";

// components
jest.mock("@material-ui/core/Fab", () => {
  return (props) => (
    <div id="mock-fab" onClick={props.onClick}>
      Mock Fab
    </div>
  );
});

jest.mock("../../components/UI/Loader/Loader", () => {
  return (props) => <div id="mock-loader">Mock Loader</div>;
});

jest.mock("../../components/Error/NothingToShow/NothingToShow.js", () => {
  return (props) => <div id="mock-nothingtoshow">Nothing To Show</div>;
});

jest.mock("../../components/Budget/BudgetForm/BudgetForm", () => {
  return (props) => (
    <div id="mock-budgetform" onClick={props.submit}>
      Mock BudgetForm
    </div>
  );
});

jest.mock("../../components/Budget/BudgetList/BudgetList", () => {
  return (props) => (
    <div id="mock-budgetlist" onClick={props.update}>
      Mock BudgetList
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
describe("Budget Tests", () => {
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

    const budgetState = {
      budgets: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    // Assert
    expect(container).toBeDefined();

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
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

    const budgetState = {
      budgets: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-fab").textContent).toBe("Mock Fab");

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
  });

  it("Should render the BudgetForm component if the showForm is true", async () => {
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

    const budgetState = {
      budgets: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-budgetform").textContent).toBe(
      "Mock BudgetForm"
    );

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
  });

  it("Should render the BudgetList component if there are any budgets", async () => {
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

    const budgetState = {
      budgets: [{}],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-budgetlist").textContent).toBe(
      "Mock BudgetList"
    );

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
  });

  it("Should render the NothingToShow component if there are no budgets", async () => {
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

    const budgetState = {
      budgets: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-nothingtoshow").textContent).toBe(
      "Nothing To Show"
    );

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
  });

  it("Should render the toast component if there is a message in the state", async () => {
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

    const budgetState = {
      budgets: [],
      message: "message",
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    // Assert
    expect(showToastMock).toHaveBeenCalledWith(budgetState.message, "success");
    expect(showToastMock).toHaveBeenCalledTimes(1);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
  });

  it("Should render the toast component if there is an error in the state", async () => {
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

    const budgetState = {
      budgets: [],
      message: null,
      error: { message: "error" },
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    // Assert
    expect(showToastMock).toHaveBeenCalledWith(
      budgetState.error.message,
      "error"
    );
    expect(showToastMock).toHaveBeenCalledTimes(1);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
  });

  it("Should render the loader component if the loading state is true", async () => {
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

    const budgetState = {
      budgets: [],
      message: null,
      error: null,
      loading: true,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    // Assert
    expect(document.getElementById("mock-loader").textContent).toBe(
      "Mock Loader"
    );

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
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

    const budgetState = {
      budgets: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
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
  });

  it("Should call startUpdate when BudgetList calls update", async () => {
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

    const budgetState = {
      budgets: [{}],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    const budgetListComponent = document.getElementById("mock-budgetlist");

    await act(async () => {
      budgetListComponent.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    // Assert
    expect(createAndUpdateFormControlData.startUpdate).toBeCalledTimes(1);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
  });

  it("Should call finishCreate when BudgetForm calls submit if the entityToUpdate is null", async () => {
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

    const budgetState = {
      budgets: [],
      message: null,
      error: null,
      loading: false,
    };

    const dispatch = jest.fn();

    mockRedux.useDispatch.mockImplementation(() => dispatch);
    mockRedux.useSelector.mockImplementation(() => budgetState);

    // Act
    await act(async () => {
      render(<Budget showToast={showToastMock} />, container);
    });

    const budgetFormComponent = document.getElementById("mock-budgetform");

    await act(async () => {
      budgetFormComponent.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    // Assert
    expect(createAndUpdateFormControlData.finishCreate).toBeCalledTimes(1);

    useCreateAndUpdateFormControlMock.mockRestore();
    mockRedux.useSelector.mockRestore();
    mockRedux.useDispatch.mockRestore();
  });
});
