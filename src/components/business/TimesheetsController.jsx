import { SaveTimesheet } from "./SaveTimesheet";
import styles from "./TimesheetsController.module.css";
import React, { useState } from "react";
import ExportTimesheets from "./ExportTimesheets";
import printTable from "../utils/printTable";

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

 function handlePrint() {
  printTable();
 }

//  const handlePrint = () => {
//   const table = document.getElementById("table-content");

//   window.print();
//  };

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
