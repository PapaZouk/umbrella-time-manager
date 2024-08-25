import React from 'react';
import { calculateTotalBalance } from '../../utils/calculateBalance';
import { dateFormatter } from '../../utils/dateFormatter';
import { calculateAnnualLeaveDays } from '../../utils/calculateAnnualLeaveDays';
import styles from './EmployeeTable.module.css';

export function EmployeeTable({ month, timesheets }) {
   const formattedDate = month ? dateFormatter(month) : 'Wybierz miesiąc';

   const sortTimesByDay = (times) => {
      return times.slice().sort((a, b) => {
         return new Date(a.day) - new Date(b.day);
      });
   };

   return (
      <div>
         <table className={styles.table}>
            <thead className={styles.thead}>
               <tr>
                  <th className={styles.tableMonthTitle}>
                     {formattedDate}</th>
               </tr>
               <tr>
                  <th>Imię</th>
                  <th>Nazwisko</th>
                  <th>Godziny</th>
                  <th>Bilans całkowity</th>
                  <th>Dni urlopowe</th>
               </tr>
            </thead>
            <tbody>
               {timesheets.map((timesheet) => {
                  const employeeData = timesheet.employee;
                  const employeeTimes = timesheet.times;
                  const sortedTimes = sortTimesByDay(timesheet.times);
                  const totalBalance = calculateTotalBalance(employeeTimes);
                  const annualLeaveDays = calculateAnnualLeaveDays(timesheet.times);
                  return (
                     <tr key={timesheet.employee.name}>
                        <td>{employeeData.name}</td>
                        <td>{employeeData.surname}</td>
                        <td className={styles['hours-cell']}>
                           {sortedTimes.map((time, index) => {
                              if (time.isHoliday) {
                                 return (
                                    <div key={index} className={`${styles['hour-detail']}`}>
                                       <span>Dzień: {time.day}</span>
                                       <span className={styles['holiday']}>URLOP</span>
                                    </div>
                                 )
                              }
                              return (
                                 <div key={index} className={styles['hour-detail']}>
                                    <span>Dzień: {time.day}</span>
                                    <span>Przyjście: {time.checkIn}</span>
                                    <span>Wyjście: {time.checkOut}</span>
                                    <span>Bilans:
                                       <span className={time.balance < 0 ? styles['balance-negative'] : styles['balance-positive']}>
                                          {time.balance}
                                       </span>
                                    </span>
                                 </div>
                              )
                           })}
                        </td>
                        <td className={styles['total-balance-cell']}>
                           <span className={totalBalance < 0 ? styles['total-balance-negative'] : styles['total-balance-positive']}>
                              {totalBalance}
                           </span>
                        </td>
                        <td className={styles.annualLeaveDays}>{annualLeaveDays}</td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </div>
   );
}