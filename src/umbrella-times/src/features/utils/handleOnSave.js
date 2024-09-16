import logger from "react-logger";
import validateTimesheet from "../validators/validateTimesheet";
import {EmployeeTimesheetContext} from "../../../../store/employee-timesheet-context";
import {useContext} from "react";

export const handleOnSave = (setError, setSuccessMessage) => {
 const { timesheet, resetTimesheet } = useContext(EmployeeTimesheetContext);

 if (timesheet.length === 0) {
  setError("Brak godzin do zapisu. Wypełmnij wszystkie godziny pracy");
  setTimeout(() => {
   setError("");
  }, 2000);
  return;
 }

 if (validateTimesheet(timesheet)) {
  logger.info("Saving employee timesheet");
  setSuccessMessage("Pomyślnie zapisano godziny.");
  setTimeout(() => {
   setSuccessMessage("");
  }, 2000);
  resetTimesheet();
 }

};
