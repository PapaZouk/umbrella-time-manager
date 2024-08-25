import { SaveTimesheet } from "./SaveTimesheet";
import * as XLSX from "xlsx";
import styles from "./TimesheetsController.module.css";
import React, { useState } from "react";
import ExportTimesheets from "./ExportTimesheets";
import { ErrorMessage } from "../utils";

export default function TimesheetsController({
 timesheets,
 handleOnSave,
 setError,
}) {
 function handleControllerError(errorMessage) {
  setError(errorMessage);
  setTimeout(() => {
   setError("");
  }, 2000);
 }
 const handlePrint = () => {
  window.print();
 };

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
     <SaveTimesheet timesheets={timesheets} onSave={handleOnSave} />
    </span>
   </div>
  </>
 );
}
