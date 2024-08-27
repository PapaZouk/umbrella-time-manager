// @ts-nocheck
import React from "react";
import styles from "./styles/SaveTimesheet.module.css";
import { handleOnSave } from "../utils/handleOnSave";

export function SaveTimesheet({ timesheets, selectedMonth, resetTimesheets, setError, setSuccessMessage }) {
 function onSave() {
  handleOnSave(timesheets, selectedMonth, resetTimesheets, setError, setSuccessMessage);
 }

 return (
  <>
   <button className={styles.saveButton} onClick={onSave}>
    Zapisz godziny
   </button>
  </>
 );
}
