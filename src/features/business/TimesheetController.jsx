import { SaveTimesheet } from "./SaveTimesheet";
import styles from "./styles/TimesheetController.module.css";
import { ExportTimesheet } from "./ExportTimesheet";
import printTable from "../utils/printTable";

export function TimesheetController({
 timesheet,
 selectedMonth,
 resetTimesheet,
 setError,
 setSuccesMessage,
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

 return (
  <>
   <div>
    <span>
     <button className={styles.printButton} onClick={handlePrint}>
      Drukuj
     </button>
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
}
