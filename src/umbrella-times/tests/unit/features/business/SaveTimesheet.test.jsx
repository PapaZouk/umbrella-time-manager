import {fireEvent, render, screen} from "@testing-library/react";
import {SaveTimesheet} from "../../../../src/features/business";
import {handleOnSave} from "../../../../src/features/utils";

jest.mock("../../../../src/features/utils/handleOnSave.js", () => ({
    handleOnSave: jest.fn(),
}));

describe("SaveTimesheet", () => {
 const saveButtonId = 'save-timesheet-button';
 const setErrorMock = jest.fn();
 const setSuccessMock = jest.fn();

 afterEach(() => {
  jest.clearAllMocks();
 });

 test("renders the save button", () => {
  render(
   <SaveTimesheet
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
    setError={setErrorMock}
    setSuccessMessage={setSuccessMock}
   />
  );

  const saveButton = screen.getByTestId(saveButtonId);
  fireEvent.click(saveButton);

  expect(handleOnSave).toHaveBeenCalledWith(
   setErrorMock,
   setSuccessMock
  );
 });
});
