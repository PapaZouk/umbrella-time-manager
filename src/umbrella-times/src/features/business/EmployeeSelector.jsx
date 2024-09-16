import {useContext, useState} from "react";
import styles from "./styles/EmployeeSelector.module.css";
import logger from "react-logger";
import { employeesData } from "../../resources/employeesData";
import { initialEmployee } from "../../resources/initialStates";
import PropTypes from "prop-types";
import {EmployeeTimesheetContext} from "../../../../store/employee-timesheet-context";

export function EmployeeSelector() {
 const {selectedEmployee, updateEmployee } = useContext(EmployeeTimesheetContext);
 const employees = employeesData();

 function handleChange(event) {
  const selectedName = event.target.value;
  const selectedEmployee = employees.find(
   (employee) => employee.name === selectedName
  );

  if (selectedEmployee) {
   logger.info("Selected employee", selectedEmployee);
   updateEmployee(selectedEmployee);
  } else {
   logger.info("Setting up initial employee");
   updateEmployee(initialEmployee);
  }
 }

 return (
  <>
   <div className="working-hours-frame">
    <label
        data-testid='employee-selector-label'
        htmlFor="employee-selector-label"
        className={styles.label}
    >
     Wybierz pracownika
    </label>
    <select
     data-testid='employee-selector-select'
     id="selected-employee"
     className={styles.select}
     onChange={handleChange}
    >
     <option value="">Wybierz...</option>
     {employees.map((employee) => (
      <option key={employee.name} value={employee.name}>
       {`${employee.name} ${employee.surname}`}
      </option>
     ))}
    </select>
   {selectedEmployee.workingHours && (
     <span className="working-hours">
      Godziny pracy: {selectedEmployee.workingHours}
     </span>
   )}
   </div>
  </>
 );
}
