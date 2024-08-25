import React from "react";
import { calculateTotalBalance } from "../../utils/calculateBalance";
import { dateFormatter } from "../../utils/dateFormatter";
import { calculateAnnualLeaveDays } from "../../utils/calculateAnnualLeaveDays";
import styles from "./EmployeeTable.module.css";

export function EmployeeTable({ month, timesheets }) {
 const formattedDate = month ? dateFormatter(month) : "Wybierz miesiąc";

 const sortTimesByDay = (times) => {
  return times.slice().sort((a, b) => {
   return new Date(a.day) - new Date(b.day);
  });
 };

 return (
  <div id="table-content">
   {timesheets.map((timesheet, timesheetIndex) => {
    const employeeData = timesheet.employee;
    const employeeTimes = timesheet.times;
    const sortedTimes = sortTimesByDay(timesheet.times);
    const totalBalance = calculateTotalBalance(employeeTimes);
    const annualLeaveDays = calculateAnnualLeaveDays(timesheet.times);

    return (
     <>
      <div>
       <table key={timesheetIndex}>
        <thead>
         <tr>
          <th>Miesiąc</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Godziny pracy</th>
          <th>Bilans całkowity</th>
          <th>Dni urlopowe</th>
         </tr>
        </thead>
        <tbody>
         <tr>
          <td>{formattedDate}</td>
          <td>{employeeData.name}</td>
          <td>{employeeData.surname}</td>
          <td>{employeeData.workingHours}</td>
          <td
           className={
            totalBalance < 0
             ? styles["total-balance-negative"]
             : styles["total-balance-positive"]
           }
          >
           {totalBalance}
          </td>
          <td>{annualLeaveDays}</td>
         </tr>
        </tbody>
       </table>
      </div>
      <div>
       <table key={timesheetIndex} className={styles.table}>
        <thead className={styles.thead}>
         <tr>
          <th>Dzień</th>
          <th>Przyjście</th>
          <th>Wyjście</th>
          <th>Bilans</th>
         </tr>
        </thead>
        <tbody>
         {sortedTimes.map((times, timesIndex) => {
          return (
           <tr key={timesIndex}>
            <td>{times.day}</td>
            {times.isHoliday ? (
             <td className={styles.holiday} colSpan={3}>
              URLOP
             </td>
            ) : (
             <>
              <td>{times.checkIn}</td>
              <td>{times.checkOut}</td>
              <td className={styles["total-balance-cell"]}>
               <span
                className={
                 times.balance < 0
                  ? styles["total-balance-negative"]
                  : styles["total-balance-positive"]
                }
               >
                {times.balance}
               </span>
              </td>
             </>
            )}
           </tr>
          );
         })}
        </tbody>
       </table>
      </div>
      <hr
       style={{ border: "1px solid grey", width: "70%", margin: "20px auto" }}
      />
     </>
    );
   })}
  </div>
 );
}
