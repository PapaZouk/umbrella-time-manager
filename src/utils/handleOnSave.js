import logger from "react-logger";
import calculateBusinessDaysInMonth from "./calulculateBusinessDaysInMonth";
import validateTimesheets from "../validators/validateTimesheets";

export const handleOnSave = (
 employeeTimesheets,
 selectedMonth,
 resetTimesheets,
 setError,
 setSuccessMessage
) => {
 if (employeeTimesheets.length === 0) {
  setError("Brak godzin do zapisu. Wypełmnij wszystkie godziny pracy");
  setTimeout(() => {
   setError("");
  }, 2000);
  return;
 }
 if (
  hasValidTimesheets(
   employeeTimesheets,
   selectedMonth,
   setError,
   setSuccessMessage
  )
 ) {
  logger.info("Saving employee timesheets");
  resetTimesheets();
 }
};

const hasValidTimesheets = (
 employeeTimesheets,
 selectedMonth,
 setError,
 setSuccessMessage
) => {
 const businessDaysInMonth = calculateBusinessDaysInMonth(selectedMonth);
 validateTimesheets(employeeTimesheets);

 const invalidTimesheets = employeeTimesheets.filter(
  (timesheet) => timesheet.times.length !== businessDaysInMonth
 );
 if (invalidTimesheets.length > 0) {
  const employeeWithInvalidTimesheets = invalidTimesheets
   .map(
    (timesheet) => `${timesheet.employee.name} ${timesheet.employee.surname}`
   )
   .join(", ");
  logger.info("Invalid timesheets: ", employeeWithInvalidTimesheets);

  setError(
   `Uzupełnij brakujące dni pracy dla pracowników: ${employeeWithInvalidTimesheets}`
  );
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
