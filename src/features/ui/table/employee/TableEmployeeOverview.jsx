import {calculateAnnualLeaveDays, calculateBusinessDaysInMonth} from "../../../utils";
import TableSummary from "../summary/TableSummary";
import TableDetails from "../details/TableDetails";
import PropTypes from "prop-types";
import {calculateTotalBalance} from "../../../utils/calculators/calculateBalance";

export default function TableEmployeeOverview(
    {
        sortedTimesheet = [],
        month,
        formattedDate,
        onTimesUpdate,
    }
    ) {
    return (
        <div data-testid='tables-content' id="table-content">
            {sortedTimesheet.map((timesheet, timesheetIndex) => {
                const employeeData = timesheet.employee;
                const employeeTimes = timesheet.times;
                const totalBalance = calculateTotalBalance(employeeTimes);
                const annualLeaveDays = calculateAnnualLeaveDays(timesheet.times);
                const totalDaysInMonth = calculateBusinessDaysInMonth(month);
                const totalRecordedDays = timesheet.times.length;

                return (
                    <div data-testid={`table-content-timesheet-${timesheetIndex}`} key={timesheetIndex}>
                        <TableSummary
                            timesheetIndex={timesheetIndex}
                            employeeData={employeeData}
                            annualLeaveDays={annualLeaveDays}
                            totalDaysInMonth={totalDaysInMonth}
                            formattedDate={formattedDate}
                            totalBalance={totalBalance}
                            totalRecordedDays={totalRecordedDays}
                        />
                        <TableDetails
                            sortedTimes={timesheet.sortedTimes}
                            onTimesUpdate={(updatedTimes) =>
                                onTimesUpdate(timesheetIndex, updatedTimes)
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
};

TableEmployeeOverview.propTypes = {
    sortedTimesheet: PropTypes.array,
    month: PropTypes.string,
    formattedDate: PropTypes.string,
    onTimesUpdate: PropTypes.func,
};
