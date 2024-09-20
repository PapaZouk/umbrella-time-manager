import buttons from '../shared/styles/Buttons.module.css';
import {useContext, useEffect} from "react";
import {EmployeeTimesheetContext} from "../../../../store/employee-timesheet-context";
import validateTimesheet from "../validators/validateTimesheet";
import {MessagesContext} from "../../../../store/messages-context";
import {DateSelectionContext} from "../../../../store/date-selection-context";

export function SaveTimesheet() {
    const { errorMessage, successMessage, setErrorMessage, setSuccessMessage } = useContext(MessagesContext);
    const {timesheet, resetTimesheet} = useContext(EmployeeTimesheetContext);
    const { updateDay, updateMonth } = useContext(DateSelectionContext);

    useEffect(() => {
        if (errorMessage !== '') {
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }

        if (successMessage !== '') {
            setTimeout(() => {
               setSuccessMessage('');
            }, 2000);
        }
    }, [errorMessage, successMessage, setErrorMessage, setSuccessMessage]);

    function onSave() {
     if (timesheet.length === 0) {
         setErrorMessage("Brak godzin do zapisu. Wypełnij wszystkie godziny pracy");
         return;
     }

     if (validateTimesheet(timesheet)) {
         setSuccessMessage("Pomyślnie zapisano godziny.");
         resetTimesheet();
         updateDay("");
         updateMonth("");
     }
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
