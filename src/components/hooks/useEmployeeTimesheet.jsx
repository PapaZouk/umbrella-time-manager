import React, { useState } from "react";
import {
 initialEmployee,
 initialTimesheets,
} from "../../resources/initialStates";
import logger from "react-logger";
import isValidNewTimesheet from "../../utils/isValidNewTimesheet";

export const useEmployeeTimesheet = () => {
 const [selectedEmployee, setSelectedEmployee] = useState(initialEmployee);
 const [employeeTimesheets, setEmployeeTimesheets] =
  useState(initialTimesheets);
 const [error, setError] = useState("");
 const [isMonthLocked, setIsMonthLocked] = useState(false);

 const handleEmployeeSelect = (employee) => setSelectedEmployee(employee);

 const handleTimesheetsUpdate = (newTimesheet) => {
  if (!isValidNewTimesheet(newTimesheet, setError)) {
   return;
  }

  setEmployeeTimesheets((previousTimesheets) => {
   const updatedTimesheets = previousTimesheets.map((timesheet) => {
    if (
     timesheet.employee.name === newTimesheet.employee.name &&
     timesheet.employee.surname === newTimesheet.employee.surname
    ) {
     const dayExists = timesheet.times.some(
      (time) => time.day === newTimesheet.times[0].day
     );

     if (dayExists) {
      logger.error("Chosen day has been already updated");
      setError("Godziny dla wybranego dnia już dodano. Wybierz kolejny dzień.");
      setTimeout(() => {
       setError("");
      }, 2000);
      return timesheet;
     } else {
      return {
       ...timesheet,
       times: [...timesheet.times, newTimesheet.times[0]],
      };
     }
    }
    logger.info("Updated timesheets for existing employee ", timesheet);
    return timesheet;
   });

   if (
    !previousTimesheets.some(
     (timesheet) =>
      timesheet.employee.name === newTimesheet.employee.name &&
      timesheet.employee.surname === newTimesheet.employee.surname
    )
   ) {
    updatedTimesheets.push(newTimesheet);
    logger.info("Updated timesheets: ", updatedTimesheets);
   }

   setIsMonthLocked(true);
   return updatedTimesheets;
  });
 };

 const resetTimesheets = () => {
  setSelectedEmployee(initialEmployee);
  setEmployeeTimesheets(initialTimesheets);
  setIsMonthLocked(false);
  setError("");
 };

 return {
  selectedEmployee,
  employeeTimesheets,
  error,
  setError,
  isMonthLocked,
  handleEmployeeSelect,
  handleTimesheetsUpdate,
  resetTimesheets,
 };
};
