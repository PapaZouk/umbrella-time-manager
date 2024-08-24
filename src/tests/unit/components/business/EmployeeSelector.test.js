import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmployeeSelector } from "../../../../components/business/EmployeeSelector";
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

 test("calls onEmployeeSelect when input is selected", () => {
  render(<EmployeeSelector onEmployeeSelect={onEmployeeSelect} />);

  const selectElement = screen.getByLabelText(/Wybierz pracownika/i);

  fireEvent.change(selectElement, { target: { value: employee.name } });

  expect(onEmployeeSelect).toHaveBeenCalledWith(employee);
 });
});
