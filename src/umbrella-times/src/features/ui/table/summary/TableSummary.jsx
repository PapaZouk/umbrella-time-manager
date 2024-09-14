import styles from '../styles/Tables.module.css';
import TableSummaryHead from "./TableSummaryHead";
import TableSummaryBody from "./TableSummaryBody";
import PropTypes from "prop-types";

export default function TableSummary({
    timesheetIndex,
    employeeData,
    annualLeaveDays,
    totalBusinessTripDays,
    totalDaysInMonth,
    formattedDate,
    totalSickLeaveDays,
    totalBalance,
    totalRecordedDays
}) {
    return (
        <table data-testid={`table-summary-${timesheetIndex}`} className={styles.table} key={timesheetIndex}>
            <TableSummaryHead columns={
                [
                    'Miesiąc',
                    'Imię',
                    'Nazwisko',
                    'Godziny pracy',
                    'Bilans całkowity (min/godz)',
                    "Wyjazdy słuzbowe",
                    'Urlop',
                    "Zwolnień lekarskich",
                    'Dni robocze w miesiącu',
                    'Dni zapisane'
                ]
            }/>
            <TableSummaryBody
                formattedDate={formattedDate}
                employeeData={employeeData}
                totalBalance={totalBalance}
                businessTripDays={totalBusinessTripDays}
                annualLeaveDays={annualLeaveDays}
                totalSickLeaveDays={totalSickLeaveDays}
                totalDaysInMonth={totalDaysInMonth}
                totalRecordedDays={totalRecordedDays}
            />
        </table>
    );
}

TableSummary.propTypes = {
    timesheetIndex: PropTypes.number,
    employeeData: PropTypes.object,
    annualLeaveDays: PropTypes.number,
    totalBusinessTripDays: PropTypes.number,
    totalDaysInMonth: PropTypes.number,
    formattedDate: PropTypes.string,
    totalSickLeaveDays: PropTypes.number,
    totalBalance: PropTypes.number,
    totalRecordedDays: PropTypes.number,
}
