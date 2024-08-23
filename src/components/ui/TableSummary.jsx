import React from 'react';
import styles from './Tables.module.css';

export default function TableSummary({
    timesheetIndex,
    employeeData,
    annualLeaveDays,
    totalDaysInMonth,
    formattedDate,
    totalBalance
}) {
    return (
        <table className={styles.table} key={timesheetIndex}>
            <thead className={styles.thead}>
                <tr className={styles.tableMonthTitle}>
                    <th>Miesiąc</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Godziny pracy</th>
                    <th>Bilans całkowity (min/godz)</th>
                    <th>Dni urlopowe</th>
                    <th>Dni robocze w miesiącu</th>
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
                        {totalBalance} / {Number(totalBalance / 60).toFixed(3)}
                    </td>
                    <td className={styles.annualLeaveDays}>{annualLeaveDays}</td>
                    <td>{totalDaysInMonth}</td>
                </tr>
            </tbody>
        </table>
    );
}
