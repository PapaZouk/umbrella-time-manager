import React from "react";
import styles from "./SaveTimesheet.module.css";
import { handleOnSave } from "../../utils/handleOnSave";

export function SaveTimesheet({
    timesheets,
    selectedMonth,
 resetTimesheets,
 setError,
 setSuccesMessage,
}) {
 function onSave() {
  handleOnSave(timesheets, selectedMonth, resetTimesheets, setError, setSuccesMessage);
 }

 function handleSaveSuccess() {
  setSuccesMessage("Pomyślnie zapisano godziny.");
  setTimeout(() => {
   setSuccesMessage("");
  }, 2000);
 }

 return (
  <>
   <button className={styles.saveButton} onClick={onSave}>
    Zapisz godziny
   </button>
  </>
 );
}
