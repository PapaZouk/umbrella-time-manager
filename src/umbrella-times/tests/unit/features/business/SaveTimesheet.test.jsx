import {fireEvent, render, screen} from "@testing-library/react";
import {SaveTimesheet} from "../../../../src/features/business";
import {handleOnSave} from "../../../../src/features/utils";

jest.mock("../../../../src/features/utils/handleOnSave.js", () => ({
    handleOnSave: jest.fn(),
}));

describe("SaveTimesheet", () => {
 const saveButtonId = 'save-timesheet-button';

 const timeSheet = [
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
 const resetTimesheetMock = jest.fn();
 const setErrorMock = jest.fn();
 const setSuccessMock = jest.fn();

 afterEach(() => {
  jest.clearAllMocks();
 });

 test("renders the save button", () => {
  render(
   <SaveTimesheet
    timesheet={timeSheet}
    resetTimesheet={resetTimesheetMock}
    setError={setErrorMock}
    setSuccessMessage={setSuccessMock}
   />
  );

  const saveButton = screen.getByTestId(saveButtonId);

  expect(saveButton).toBeInTheDocument();
 });

 test("calls onSave when the save button is clicked", () => {
  render(
   <SaveTimesheet
    timesheet={timeSheet}
    resetTimesheet={resetTimesheetMock}
    setError={setErrorMock}
    setSuccessMessage={setSuccessMock}
   />
  );

  const saveButton = screen.getByTestId(saveButtonId);
  fireEvent.click(saveButton);

  expect(handleOnSave).toHaveBeenCalledWith(
   timeSheet,
   resetTimesheetMock,
   setErrorMock,
   setSuccessMock
  );
 });
});
