import buttons from '../shared/styles/Buttons.module.css';
import {handleOnSave} from "../utils";
import PropTypes from "prop-types";

export function SaveTimesheet(
    {
        timesheet,
        resetTimesheet,
        setError,
        setSuccessMessage,
    }
    ) {
 function onSave() {
  handleOnSave(timesheet, resetTimesheet, setError, setSuccessMessage);
 }

 return (
  <>
   <button
       data-testid='save-timesheet-button'
       className={buttons.redButton}
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
