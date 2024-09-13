import logger from "react-logger";
import validateTimesheet from "../validators/validateTimesheet";

export const handleOnSave = (employeeTimesheet, resetTimesheet, setError, setSuccessMessage) => {
 if (employeeTimesheet.length === 0) {
  setError("Brak godzin do zapisu. Wypełmnij wszystkie godziny pracy");
  setTimeout(() => {
   setError("");
  }, 2000);
  return;
 }
 if (validateTimesheet(employeeTimesheet)) {
  logger.info("Saving employee timesheet");
  setSuccessMessage("Pomyślnie zapisano godziny.");
  setTimeout(() => {
   setSuccessMessage("");
  }, 2000);
  resetTimesheet();
 }
};
