import styles from "./styles/SaveTimesheet.module.css";
import { handleOnSave } from "../utils/handleOnSave";

export function SaveTimesheet({ timesheet: timesheet, selectedMonth, resetTimesheet, setError, setSuccessMessage }) {
 function onSave() {
  handleOnSave(timesheet, selectedMonth, resetTimesheet, setError, setSuccessMessage);
 }

 return (
  <>
   <button className={styles.saveButton} onClick={onSave}>
    Zapisz godziny
   </button>
  </>
 );
}
