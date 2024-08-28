import styles from "../styles/Tables.module.css";
import PropTypes from "prop-types";

export default function TableSummaryBody(
    {
        formattedDate,
        employeeData,
        totalBalance,
        annualLeaveDays,
        totalDaysInMonth,
        totalRecordedDays,
    }
    ) {
    return (
        <tbody>
        <tr>
            <td data-testid='summary-body-date'>{formattedDate}</td>
            <td data-testid='summary-body-employee-name'>{employeeData.name}</td>
            <td data-testid='summary-body-employee-surname'>{employeeData.surname}</td>
            <td data-testid='summary-body-employee-working-hours'>{employeeData.workingHours}</td>
            <td
                data-testid='summary-body-total-balance'
                className={
                    totalBalance < 0
                        ? styles["total-balance-negative"]
                        : styles["total-balance-positive"]
                }
            >
                {totalBalance} / {Number(totalBalance / 60).toFixed(2)}
            </td>
            <td
                data-testid='summary-body-annual-leave-days'
                className={styles.annualLeaveDays}
            >
                {annualLeaveDays} / {employeeData.annualLeave}
            </td>
            <td data-testid='summary-body-total-days-in-month'>{totalDaysInMonth}</td>
            <td data-testid='summary-body-total-recorded-days'>{totalRecordedDays}</td>
        </tr>
        </tbody>
    );
};

TableSummaryBody.propTypes = {
    formattedDate: PropTypes.string,
    employeeData: PropTypes.object,
    totalBalance: PropTypes.number,
    annualLeaveDays: PropTypes.number,
    totalDaysInMonth: PropTypes.number,
    totalRecordedDays: PropTypes.number,
}
