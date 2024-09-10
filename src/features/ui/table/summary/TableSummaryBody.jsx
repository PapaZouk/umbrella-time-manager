import styles from "../styles/Tables.module.css";
import PropTypes from "prop-types";
import {calculateTotalHoursAndMinutes} from "../../../utils/calculators/calculateBalance";

export default function TableSummaryBody(
    {
        formattedDate,
        employeeData,
        totalBalance,
        businessTripDays,
        annualLeaveDays,
        totalSickLeaveDays,
        totalDaysInMonth,
        totalRecordedDays,
    }
    ) {
    const totalHoursAndMinutes = calculateTotalHoursAndMinutes(totalBalance);
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
                {totalBalance} / {totalHoursAndMinutes}
            </td>
            <td
                data-testid='summary-body-total-business-trip-days'
                className={styles.businessTrip}
            >
                {businessTripDays}
            </td>
            <td
                data-testid='summary-body-annual-leave-days'
                className={styles.annualLeaveDays}
            >
                {annualLeaveDays} / {employeeData.annualLeave}
            </td>
            <td
                data-testid='summary-body-total-sick-leave-days'
                className={styles.sickLeave}
            >
                {totalSickLeaveDays}
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
    businessTripDays: PropTypes.number,
    annualLeaveDays: PropTypes.number,
    totalSickLeaveDays: PropTypes.number,
    totalDaysInMonth: PropTypes.number,
    totalRecordedDays: PropTypes.number,
}
