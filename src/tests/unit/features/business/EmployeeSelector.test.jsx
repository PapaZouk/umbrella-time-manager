import { render, fireEvent } from "@testing-library/react";
import { EmployeeSelector } from "../../../../features/business";
import { employeesData } from "../../../../resources/employeesData";

jest.mock("../../../../resources/employeesData");

describe("EmployeeSelector", () => {
 const onEmployeeSelect = jest.fn();
 const employee = {
  name: "John",
  surname: "Doe",
  workingHours: "09:00-17:00",
 };

 beforeEach(() => {
  employeesData.mockImplementation(() => [employee]);
 });

 test("calls onEmployeeSelect when select is selected", () => {
  const { getByTestId } = render(<EmployeeSelector onEmployeeSelect={onEmployeeSelect} />);

  const selectElement = getByTestId('employee-selector-select');

  fireEvent.change(selectElement, { target: { value: employee.name } });

  expect(onEmployeeSelect).toHaveBeenCalledWith(employee);
 });
});
