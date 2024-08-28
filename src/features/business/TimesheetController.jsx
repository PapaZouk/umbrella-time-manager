import { SaveTimesheet } from "./SaveTimesheet";
import { ExportTimesheet } from "./ExportTimesheet";
import { printTable } from "../utils";
import PrintTimesheet from "./PrintTimesheet";
import PropTypes from "prop-types";

export function TimesheetController(
    {
     timesheet,
     selectedMonth,
     resetTimesheet,
     setError,
     setSuccesMessage,
    }
) {
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
   <div data-testid='timesheet-controller'>
    <span>
     <PrintTimesheet handlePrint={handlePrint}/>
     <ExportTimesheet
      timesheet={timesheet}
      onError={handleControllerError}
     />
     <SaveTimesheet
      timesheet={timesheet}
      selectedMonth={selectedMonth}
      resetTimesheet={resetTimesheet}
      setError={setError}
      setSuccessMessage={setSuccesMessage}
     />
    </span>
   </div>
  </>
 );
};

TimesheetController.propTypes = {
 timesheet: PropTypes.array,
 selectedMonth: PropTypes.string,
 resetTimesheet: PropTypes.func,
 setError: PropTypes.func,
 setSuccesMessage: PropTypes.func,
}
