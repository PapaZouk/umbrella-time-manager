import { render, screen, fireEvent } from "@testing-library/react";
import { EmployeeSelector } from "../../../../src/features/business";
import { employeesData } from "../../../../src/resources/employeesData";
import {EmployeeTimesheetContext} from "../../../../../store/employee-timesheet-context";

jest.mock("../../../../src/resources/employeesData");

describe("EmployeeSelector", () => {
 const employeeSelectorLabelId = 'employee-selector-label';
 const employeeSelectorSelectId = 'employee-selector-select';

 const employee = {
  name: "John",
  surname: "Doe",
  workingHours: "09:00-17:00",
 };

 beforeEach(() => {
  employeesData.mockImplementation(() => [employee]);
 });

 test('renders labels and selectors correctly', () => {
  const employee = {
   name: "John",
   surname: "Doe",
   workingHours: "09:00-17:00",
  };

  const employeeTimesheetContextValueMock = {
   selectedEmployee: employee,
   updateEmployee: jest.fn(),
  };

  render(
      <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
       <EmployeeSelector />
      </EmployeeTimesheetContext.Provider>
  );

  const employeeSelectorLabel = screen.getByTestId(employeeSelectorLabelId);
  const employeeSelectorSelect = screen.getByTestId(employeeSelectorSelectId);

  expect(employeeSelectorLabel).toBeInTheDocument();
  expect(employeeSelectorSelect).toBeInTheDocument();
 });

 test("calls updateEmployee when select is selected", () => {
  const employee = {
   name: "John",
   surname: "Doe",
   workingHours: "09:00-17:00",
  };

  const employeeTimesheetContextValueMock = {
   selectedEmployee: employee,
   updateEmployee: jest.fn(),
  };

  render(
      <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
       <EmployeeSelector />
      </EmployeeTimesheetContext.Provider>
  );

  const selectElement = screen.getByTestId('employee-selector-select');

  fireEvent.change(selectElement, { target: { value: employee.name } });

  expect(employeeTimesheetContextValueMock.updateEmployee).toHaveBeenCalledWith(employee);
 });
});
