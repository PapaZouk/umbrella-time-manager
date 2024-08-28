import styles from "./styles/SaveTimesheet.module.css";
import {handleOnSave} from "../utils";
import PropTypes from "prop-types";

export function SaveTimesheet(
    {
        timesheet,
        selectedMonth,
        resetTimesheet,
        setError,
        setSuccessMessage,
    }
    ) {
 function onSave() {
  handleOnSave(timesheet, selectedMonth, resetTimesheet, setError, setSuccessMessage);
 }

 return (
  <>
   <button
       data-testid='save-timesheet-button'
       className={styles.saveButton}
       onClick={onSave}
   >
    Zapisz godziny
   </button>
  </>
 );
}

SaveTimesheet.propTypes = {
    timesheet: PropTypes.array,
    selectedMonth: PropTypes.string,
    resetTimesheet: PropTypes.func,
    setError: PropTypes.func,
    setSuccessMessage: PropTypes.func,
}
