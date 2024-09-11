import { SaveTimesheet } from "../business";
import { printTable } from "../utils";
import PrintTimesheet from "../business/PrintTimesheet";
import PropTypes from "prop-types";

export function TimesheetController(
    {
     timesheet,
     resetTimesheet,
     setError,
     setSuccessMessage,
    }
) {
 function handlePrint() {
  printTable();
 }

 return (
  <>
   <div data-testid='timesheet-controller'>
    <span>
     <PrintTimesheet handlePrint={handlePrint}/>
     <SaveTimesheet
      timesheet={timesheet}
      resetTimesheet={resetTimesheet}
      setError={setError}
      setSuccessMessage={setSuccessMessage}
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
 setSuccessMessage: PropTypes.func,
}
