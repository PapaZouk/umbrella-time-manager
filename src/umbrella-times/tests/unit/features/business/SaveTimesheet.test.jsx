import {fireEvent, render, screen} from "@testing-library/react";
import {SaveTimesheet} from "../../../../src/features/business";
import {EmployeeTimesheetContext} from "../../../../../store/employee-timesheet-context";
import {MessagesContext} from "../../../../../store/messages-context";
import {DateSelectionContext} from "../../../../../store/date-selection-context";
import validateTimesheet from "../../../../src/features/validators/validateTimesheet";

jest.mock("../../../../src/features/utils/useHandleOnSave", () => ({
    handleOnSave: jest.fn(),
}));

jest.mock('../../../../src/features/validators/validateTimesheet');

describe("SaveTimesheet", () => {
  const saveButtonId = 'save-timesheet-button';

  const messageContextValueMock = {
   setErrorMessage: jest.fn(),
   setSuccessMessage: jest.fn(),
  };

  const employeeTimesheetContextValueMock = {
   timesheet: [{ test: "value" }],
   resetTimesheet: jest.fn(),
  };

  const dateSelectionContextValueMock = {
   updateDay: jest.fn(),
   updateMonth: jest.fn(),
  }

  afterEach(() => {
      jest.clearAllMocks();
  });

 test("renders the save button", () => {
     render(
         <MessagesContext.Provider value={messageContextValueMock}>
             <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                 <DateSelectionContext.Provider value={dateSelectionContextValueMock}>
                     <SaveTimesheet />
                 </DateSelectionContext.Provider>
             </EmployeeTimesheetContext.Provider>
         </MessagesContext.Provider>
     );

     const saveButton = screen.getByTestId(saveButtonId);


     expect(saveButton).toBeInTheDocument();
 });

 test("calls setSuccessMessage when the save button is clicked", () => {
     validateTimesheet.mockReturnValue(true);
     jest.useFakeTimers();

     render(
         <MessagesContext.Provider value={messageContextValueMock}>
             <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                 <DateSelectionContext.Provider value={dateSelectionContextValueMock}>
                     <SaveTimesheet />
                 </DateSelectionContext.Provider>
             </EmployeeTimesheetContext.Provider>
         </MessagesContext.Provider>
     );

     const saveButton = screen.getByTestId(saveButtonId);
     fireEvent.click(saveButton);

     expect(messageContextValueMock.setSuccessMessage).toHaveBeenCalledWith("Pomyślnie zapisano godziny.");
     expect(employeeTimesheetContextValueMock.resetTimesheet).toHaveBeenCalled();
     expect(dateSelectionContextValueMock.updateDay).toHaveBeenCalledWith("");
     expect(dateSelectionContextValueMock.updateMonth).toHaveBeenCalledWith("");

     jest.advanceTimersByTime(2000);

     expect(messageContextValueMock.setSuccessMessage).toHaveBeenCalledWith("");
     jest.useRealTimers();
 });

 test("calls setErrorMessage when empty timesheet was received", () => {
     jest.useFakeTimers();
     employeeTimesheetContextValueMock.timesheet = [];
     render(
         <MessagesContext.Provider value={messageContextValueMock}>
             <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                 <DateSelectionContext.Provider value={dateSelectionContextValueMock}>
                     <SaveTimesheet />
                 </DateSelectionContext.Provider>
             </EmployeeTimesheetContext.Provider>
         </MessagesContext.Provider>
     );

     const saveButton = screen.getByTestId(saveButtonId);
     fireEvent.click(saveButton);

     expect(messageContextValueMock.setErrorMessage).toHaveBeenCalledWith(
         "Brak godzin do zapisu. Wypełnij wszystkie godziny pracy"
     );

     jest.advanceTimersByTime(2000);

     expect(messageContextValueMock.setErrorMessage).toHaveBeenCalledWith("");
     jest.useRealTimers();
 });
});
