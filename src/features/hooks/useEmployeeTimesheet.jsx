import {useState} from "react";
import {initialEmployee, initialTimesheet,} from "../../resources/initialStates";
import logger from "react-logger";
import { isValidNewTimesheet } from "../utils";

export const useEmployeeTimesheet = () => {
 const [selectedEmployee, setSelectedEmployee] = useState(initialEmployee);
 const [employeeTimesheet, setEmployeeTimesheet] =
  useState(initialTimesheet);
 const [error, setError] = useState("");
 const [successMessage, setSuccessMessage] = useState("");
 const [popupContent, setPopupContent] = useState("");
 const [isMonthLocked, setIsMonthLocked] = useState(false);

 const handleEmployeeSelect = (employee) => setSelectedEmployee(employee);

 const handleEditedTimesheet = (editedTimesheet) => {
  if (!isValidNewTimesheet(editedTimesheet, setError)) {
   return;
  }

  setEmployeeTimesheet((previousTimesheet) => {
   const updateTimesheet = previousTimesheet.map((timesheet) => ({
    ...timesheet,
    times: [...editedTimesheet.times],
   }));

   return updateTimesheet;
  });
 };

 const handleTimesheetUpdate = (newTimesheet) => {
  if (!isValidNewTimesheet(newTimesheet, setError)) {
   return;
  }

  setEmployeeTimesheet((previousTimesheet) => {
   const updatedTimesheet = previousTimesheet.map((timesheet) => {
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
      logger.info(`Updated timesheet for existing employee: ${timesheet.employee.name} ${timesheet.employee.surname}`);
      return {
       ...timesheet,
       times: [...timesheet.times, newTimesheet.times[0]],
      };
     }
    }
    return timesheet;
   });

   if (
    !previousTimesheet.some(
     (timesheet) =>
      timesheet.employee.name === newTimesheet.employee.name &&
      timesheet.employee.surname === newTimesheet.employee.surname
    )
   ) {
    updatedTimesheet.push(newTimesheet);
    logger.info(
        `Updated timesheet for new employee: `,
        updatedTimesheet,
    );
   }

   setIsMonthLocked(true);
   return updatedTimesheet;
  });
 };

 const resetTimesheet = () => {
  setSelectedEmployee(initialEmployee);
  setEmployeeTimesheet(initialTimesheet);
  setIsMonthLocked(false);
  setError("");
 };

 return {
  selectedEmployee,
  employeeTimesheet,
  error,
  successMessage,
  setError,
  popupContent,
  setPopupContent,
  setSuccessMessage: setSuccessMessage,
  handleEditedTimesheet,
  isMonthLocked,
  handleEmployeeSelect,
  handleTimesheetUpdate,
  resetTimesheet: resetTimesheet,
 };
};
