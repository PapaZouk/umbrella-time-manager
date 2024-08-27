import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {TimesheetSelector} from "../../../../features/business";

jest.mock("../../../../features/utils/calculateBalance", () => ({
 calculateBalance: jest.fn((checkIn, checkOut, workingHours) => {
  return 10;
 }),
}));

describe("TimesheetSelector", () => {
 const onTimesheetsUpdateMock = jest.fn();
 const employee = {
  name: "Joe",
  surname: "Bloggs",
  workingHours: "08:00-16:00",
 };
 const month = "Sierpień";
 const day = "12";
 const checkIn = "08:20";
 const checkOut = "16:30";

 test("renders all inputs, annual leave button and add button correctly", () => {
  render(
   <TimesheetSelector
    employee={employee}
    month={month}
    day={day}
    onTimesheetsUpdate={onTimesheetsUpdateMock}
   />
  );

  const annualLeaveButton = screen.getByText("Urlop");
  const addButton = screen.getByText("Dodaj");
  const checkInInput = screen.getByLabelText("Przyjście");
  const checkOutInput = screen.getByLabelText("Wyjście");

  expect(annualLeaveButton).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
  expect(checkInInput).toBeInTheDocument();
  expect(checkOutInput).toBeInTheDocument();
 });

 test("should mark day in timesheet as holiday when annual leave button is clicked", () => {
  const checkIn = "";
  const checkOut = "";
  const expectedTimesheet = {
   employee,
   times: [
    {
     checkIn,
     checkOut,
     month,
     day,
     isHoliday: true,
     balance: 0,
    },
   ],
  };

  render(
   <TimesheetSelector
    employee={employee}
    month={month}
    day={day}
    onTimesheetsUpdate={onTimesheetsUpdateMock}
   />
  );

  const annualLeaveButton = screen.getByText("Urlop");
  fireEvent.click(annualLeaveButton);

  expect(onTimesheetsUpdateMock).toHaveBeenCalledWith(expectedTimesheet);
 });
 test("selecting timesheet for check-in and check-out should update timesheet values", () => {
  render(
   <TimesheetSelector
    employee={employee}
    month={month}
    day={day}
    onTimesheetsUpdate={onTimesheetsUpdateMock}
   />
  );

  const checkInInput = screen.getByLabelText("Przyjście");
  const checkOutInput = screen.getByLabelText("Wyjście");

  fireEvent.change(checkInInput, { target: { value: checkIn } });
  fireEvent.change(checkOutInput, { target: { value: checkOut } });

  expect(checkInInput.value).toBe(checkIn);
  expect(checkOutInput.value).toBe(checkOut);
 });

 test("should update employee timesheets with all given data and reset times inputs", () => {
  const expectedUpdatedTimesheet = {
   employee,
   times: [
    {
     checkIn,
     checkOut,
     month,
     day,
     isHoliday: false,
     balance: 10,
    },
   ],
  };

  render(
   <TimesheetSelector
    employee={employee}
    month={month}
    day={day}
    onTimesheetsUpdate={onTimesheetsUpdateMock}
   />
  );

  const addButton = screen.getByText("Dodaj");
  const checkInInput = screen.getByLabelText("Przyjście");
  const checkOutInput = screen.getByLabelText("Wyjście");

  fireEvent.change(checkInInput, { target: { value: checkIn } });
  fireEvent.change(checkOutInput, { target: { value: checkOut } });
  fireEvent.click(addButton);

  expect(checkInInput.value).toBe("");
  expect(checkOutInput.value).toBe("");
  expect(onTimesheetsUpdateMock).toHaveBeenCalledWith(expectedUpdatedTimesheet);
 });
});
