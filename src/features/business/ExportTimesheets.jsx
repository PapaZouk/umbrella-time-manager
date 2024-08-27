import React from 'react'
import styles from './styles/ExportTimesheets.module.css';
import * as XLSX from 'xlsx';

export default function ExportTimesheets({ timesheets, onError }) {
 const handleExport = () => {
  if (timesheets.length < 1) {
      onError("Brak godzin do exportowania");
      setTimeout(() => {
          onError('');
      }, 2000);
   return;
  }

  const ws = XLSX.utils.table_to_sheet(document.getElementById("table-content"));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Timesheets");
  XLSX.writeFile(wb, "timesheets.xlsx");
 };

 return (
  <>
   <button className={styles.exportButton} onClick={handleExport}>
    Exportuj
   </button>
  </>
 );
}
