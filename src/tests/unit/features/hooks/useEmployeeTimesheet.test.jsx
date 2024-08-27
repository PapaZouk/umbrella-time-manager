import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { useEmployeeTimesheet } from "../../../../features/hooks/useEmployeeTimesheet";
import {
 initialEmployee,
 initialTimesheets,
} from "../../../../resources/initialStates";

const TestComponent = () => {
 const {
  selectedEmployee,
  employeeTimesheets,
  error,
  isMonthLocked,
  handleEmployeeSelect,
  handleTimesheetsUpdate,
  resetTimesheets,
 } = useEmployeeTimesheet();

 return (
  <div>
   <div data-testid="selected-employee">{JSON.stringify(selectedEmployee)}</div>
   <div data-testid="timesheets">{JSON.stringify(employeeTimesheets)}</div>
   <div data-testid="error">{error}</div>
   <div data-testid="month-locked">{isMonthLocked ? "Locked" : "Unlocked"}</div>
   <button
    onClick={() => handleEmployeeSelect({ name: "John", surname: "Doe" })}
    data-testid="select-employee"
   >
    Select Employee
   </button>
   <button
    onClick={() =>
     handleTimesheetsUpdate({
      employee: { name: "John", surname: "Doe" },
      times: [
       { day: 1, checkIn: "08:00", checkOut: "16:00", isHoliday: false },
      ],
     })
    }
    data-testid="update-timesheet"
   >
    Update Timesheet
   </button>
   <button onClick={resetTimesheets} data-testid="reset-timesheets">
    Reset Timesheets
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
  expect(screen.getByTestId("timesheets").textContent).toBe(
   JSON.stringify(initialTimesheets)
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

 test("should update timesheets correctly", () => {
  render(<TestComponent />);

  const updatedTimessheets = [
   {
    employee: { name: "John", surname: "Doe" },
    times: [{ day: 1, checkIn: "08:00", checkOut: "16:00", isHoliday: false }],
   },
  ];

  act(() => {
   screen.getByTestId("update-timesheet").click();
  });

  expect(screen.getByTestId("timesheets").textContent).toBe(
   JSON.stringify(updatedTimessheets)
  );
  expect(screen.getByTestId("month-locked").textContent).toBe("Locked");
  expect(screen.getByTestId("error").textContent).toBe("");
 });

 test("should reset timesheets to its initial state", () => {
  render(<TestComponent />);

  act(() => {
   screen.getByTestId("select-employee").click();
   screen.getByTestId("update-timesheet").click();
  });

  act(() => {
   screen.getByTestId("reset-timesheets").click();
  });

  expect(screen.getByTestId("selected-employee").textContent).toBe(
   JSON.stringify(initialEmployee)
  );
  expect(screen.getByTestId("timesheets").textContent).toBe(
   JSON.stringify(initialTimesheets)
  );
  expect(screen.getByTestId("month-locked").textContent).toBe("Unlocked");
 });
});
