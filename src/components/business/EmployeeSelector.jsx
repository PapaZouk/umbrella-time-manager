import React from "react";
import styles from "./EmployeeSelector.module.css";
import logger from "react-logger";
import { employeesData } from "../../resources/employeesData";

export function EmployeeSelector({ onEmployeeSelect }) {
 const employees = employeesData();

 function handleChange(event) {
  const selectedName = event.target.value;
  const selectedEmployee = employees.find(
   (employee) => employee.name === selectedName
  );

  logger.info("Selected employee", selectedEmployee);
  onEmployeeSelect(selectedEmployee);
 }

 return (
  <div className={styles.container}>
   <label htmlFor="selected-employee" className={styles.label}>
    Wybierz pracownika
   </label>
   <select
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
  </div>
 );
}
