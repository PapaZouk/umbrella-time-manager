import logger from "react-logger";
import {calculateBusinessDaysInMonth} from "./calculators/calulculateBusinessDaysInMonth";
import validateTimesheet from "../validators/validateTimesheet";

export const handleOnSave = (employeeTimesheet, selectedMonth, resetTimesheets, setError, setSuccessMessage) => {
 if (employeeTimesheet.length === 0) {
  setError("Brak godzin do zapisu. Wypełmnij wszystkie godziny pracy");
  setTimeout(() => {
   setError("");
  }, 2000);
  return;
 }
 if (hasValidTimesheet(employeeTimesheet, selectedMonth, setError, setSuccessMessage)) {
  logger.info("Saving employee timesheet");
  resetTimesheets();
 }
};

const hasValidTimesheet = (employeeTimesheet, selectedMonth, setError, setSuccessMessage) => {
 const businessDaysInMonth = calculateBusinessDaysInMonth(selectedMonth);
 validateTimesheet(employeeTimesheet);

 const invalidTimesheet = employeeTimesheet.filter((timesheet) => timesheet.times.length !== businessDaysInMonth);
 if (invalidTimesheet.length > 0) {
  const employeeWithInvalidTimesheet = invalidTimesheet
   .map((timesheet) => `${timesheet.employee.name} ${timesheet.employee.surname}`)
   .join(", ");
  logger.info("Invalid timesheet: ", employeeWithInvalidTimesheet);

  setError(`Uzupełnij brakujące dni pracy dla pracowników: ${employeeWithInvalidTimesheet}`);
  setTimeout(() => {
   setError("");
  }, 2000);
  return false;
 }
 setSuccessMessage("Pomyślnie zapisano godziny.");
 setTimeout(() => {
  setSuccessMessage("");
 }, 2000);
 return true;
};
