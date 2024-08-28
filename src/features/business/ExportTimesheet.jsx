import styles from './styles/ExportTimesheet.module.css';
import * as XLSX from 'xlsx';
import PropTypes from "prop-types";

export function ExportTimesheet({ timesheet, onError }) {
 const handleExport = () => {
  if (timesheet.length < 1) {
      onError("Brak godzin do exportowania");
      setTimeout(() => {
          onError('');
      }, 2000);
   return;
  }

  const ws = XLSX.utils.table_to_sheet(document.getElementById("table-content"));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Timesheet");
  XLSX.writeFile(wb, "timesheet.xlsx");
 };

 return (
  <>
   <button data-testid='export-button' className={styles.exportButton} onClick={handleExport}>
    Exportuj
   </button>
  </>
 );
}

ExportTimesheet.propTypes = {
    timesheet: PropTypes.array,
    onError: PropTypes.func,
};
