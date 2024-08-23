import { SaveTimesheet } from "./SaveTimesheet";
import styles from "./TimesheetsController.module.css";
import React from "react";
import ExportTimesheets from "./ExportTimesheets";
import printTable from "../utils/printTable";

export default function TimesheetsController({
 timesheets,
 selectedMonth,
 resetTimesheets,
 setError,
 setSuccesMessage,
}) {
 function handleControllerError(errorMessage) {
  setError(errorMessage);
  setTimeout(() => {
   setError("");
  }, 2000);
 }

 function handlePrint() {
  printTable();
 }

 return (
  <>
   <div>
    <span>
     <button className={styles.printButton} onClick={handlePrint}>
      Drukuj
     </button>
     <ExportTimesheets
      timesheets={timesheets}
      onError={handleControllerError}
     />
     <SaveTimesheet
      timesheets={timesheets}
      selectedMonth={selectedMonth}
      resetTimesheets={resetTimesheets}
      setError={setError}
      setSuccesMessage={setSuccesMessage}
     />
    </span>
   </div>
  </>
 );
}
