import React from 'react'
import styles from './ExportTimesheets.module.css';

export default function ExportTimesheets({ timesheets, onError }) {
 const handleExport = () => {
  if (timesheets.length < 1) {
      onError("Brak godzin do exportowania");
      setTimeout(() => {
          onError('');
      }, 2000);
   return;
  }
     
  const ws = XLSX.utils.table_to_sheet(document.querySelector("table"));
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
