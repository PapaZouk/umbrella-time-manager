import {act, render, screen} from "@testing-library/react";
import {useEmployeeTimesheet} from "../../../../features/hooks";
import {initialEmployee, initialTimesheet,} from "../../../../resources/initialStates";
import {generateTimesheetWithEmployeeMock} from "../../_mocks/generateTimesheetWithEmployee.mock";

const timesheet =  generateTimesheetWithEmployeeMock();

const TestComponent = () => {
 const {
  selectedEmployee,
  employeeTimesheet,
  error,
  isMonthLocked,
  handleEmployeeSelect,
  handleTimesheetUpdate,
  resetTimesheet,
 } = useEmployeeTimesheet();

 return (
  <div>
   <div data-testid="selected-employee">{JSON.stringify(selectedEmployee)}</div>
   <div data-testid="timesheet">{JSON.stringify(employeeTimesheet)}</div>
   <div data-testid="error">{error}</div>
   <div data-testid="month-locked">{isMonthLocked ? "Locked" : "Unlocked"}</div>
   <button
    onClick={() => handleEmployeeSelect({ name: "John", surname: "Doe" })}
    data-testid="select-employee"
   >
    Select Employee
   </button>
   <button
       data-testid="update-timesheet"
       onClick={() =>
           handleTimesheetUpdate(timesheet)}
   >
    Update Timesheet
   </button>
   <button onClick={resetTimesheet} data-testid="reset-timesheet">
    Reset Timesheet
   </button>
  </div>
 );
};

describe("useEmployeeTimesheet", () => {
 test("should initialize with correct default values", () => {
  render(<TestComponent />);

  expect(screen.getByTestId("selected-employee").textContent).toBe(
   JSON.stringify(initialEmployee)
  );
  expect(screen.getByTestId("timesheet").textContent).toBe(
   JSON.stringify(initialTimesheet)
  );
  expect(screen.getByTestId("error").textContent).toBe("");
  expect(screen.getByTestId("month-locked").textContent).toBe("Unlocked");
 });

 test("should handle employee selection", () => {
  render(<TestComponent />);

  act(() => {
   screen.getByTestId("select-employee").click();
  });

  expect(screen.getByTestId("selected-employee").textContent).toBe(
   JSON.stringify({ name: "John", surname: "Doe" })
  );
 });

 test("should update timesheet correctly", () => {
  render(<TestComponent />);

  act(() => {
   screen.getByTestId("update-timesheet").click();
  });

  expect(screen.getByTestId("timesheet").textContent).toBe(
   JSON.stringify([timesheet])
  );
  expect(screen.getByTestId("month-locked").textContent).toBe("Locked");
  expect(screen.getByTestId("error").textContent).toBe("");
 });

 test("should reset timesheet to its initial state", () => {
  render(<TestComponent />);

  act(() => {
   screen.getByTestId("select-employee").click();
   screen.getByTestId("update-timesheet").click();
  });

  act(() => {
   screen.getByTestId("reset-timesheet").click();
  });

  expect(screen.getByTestId("selected-employee").textContent).toBe(
   JSON.stringify(initialEmployee)
  );
  expect(screen.getByTestId("timesheet").textContent).toBe(
   JSON.stringify(initialTimesheet)
  );
  expect(screen.getByTestId("month-locked").textContent).toBe("Unlocked");
 });
});
