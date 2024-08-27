import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {SaveTimesheet} from "../../../../features/business/SaveTimesheet";
import {handleOnSave} from "../../../../features/utils/handleOnSave.js";

jest.mock("../../../../features/utils/handleOnSave.js", () => ({
    handleOnSave: jest.fn(),
}));

describe("SaveTimesheet", () => {
 const onSaveMock = jest.fn();

 const timeSheets = [
  {
   employee: {
    name: "Joe",
    surname: "Bloggs",
    workingHours: "08:00-16:00",
   },
   times: [
    {
     checkIn: "08:10",
     checkOut: "15:55",
     month: "2024-08",
     day: "1",
     balance: -15,
     isHoliday: false,
    },
   ],
  },
 ];
 const selectedMonth = "2024-08";
 const resetTimesheetsMock = jest.fn();
 const setErrorMock = jest.fn();
 const setSuccessMock = jest.fn();

 afterEach(() => {
  jest.clearAllMocks();
 });

 test("renders the save button", () => {
  render(
   <SaveTimesheet
    timesheets={timeSheets}
    selectedMonth={selectedMonth}
    resetTimesheets={resetTimesheetsMock}
    setError={setErrorMock}
    setSuccessMessage={setSuccessMock}
   />
  );

  const saveButton = screen.getByText("Zapisz godziny");

  expect(saveButton).toBeInTheDocument();
 });

 test("calls onSave when the save button is clicked", () => {
  render(
   <SaveTimesheet
    timesheets={timeSheets}
    selectedMonth={selectedMonth}
    resetTimesheets={resetTimesheetsMock}
    setError={setErrorMock}
    setSuccessMessage={setSuccessMock}
   />
  );

  const saveButton = screen.getByText("Zapisz godziny");
  fireEvent.click(saveButton);

  expect(handleOnSave).toHaveBeenCalledWith(
   timeSheets,
   selectedMonth,
   resetTimesheetsMock,
   setErrorMock,
   setSuccessMock
  );
 });
});
