import React from "react";
import { useState } from "react";
import styles from "./SaveTimesheet.module.css";
import validateTimesheets from "../../validators/validateTimesheets";
import { ErrorMessage, SuccessMessage } from "../utils";

export function SaveTimesheet({ timesheets, onSave }) {
 const [saveError, setSaveError] = useState("");
 const [saveSuccess, setSaveSuccess] = useState("");

 function handleSave() {
  if (timesheets.length < 1) {
   setSaveError("Brak godzin do zapisu. Dodaj godziny.");
   setTimeout(() => {
    setSaveError("");
   }, 2000);
   return;
  }
  validateTimesheets(timesheets);
  onSave(timesheets);
  handleSaveSuccess();
 }

 function handleSaveSuccess() {
  setSaveSuccess("Pomyślnie zapisano godziny.");
  setTimeout(() => {
   setSaveSuccess("");
  }, 2000);
 }

 return (
  <>
   <button className={styles.saveButton} onClick={handleSave}>
    Zapisz godziny
   </button>
   <ErrorMessage message={saveError} />
   <SuccessMessage message={saveSuccess} />
  </>
 );
}
