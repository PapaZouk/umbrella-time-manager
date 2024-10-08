import {calculateAnnualLeaveDays, calculateBusinessDaysInMonth} from "../../../utils";
import TableSummary from "../summary/TableSummary";
import TableDetails from "../details/TableDetails";
import PropTypes from "prop-types";
import {calculateTotalBalance} from "../../../utils/calculators/calculateBalance";
import {calculateBusinessTripDays} from "../../../utils/calculators/calculateBusinessTripDays";
import {calculateTotalSickLeaveDays} from "../../../utils/calculators/calculateTotalSickLeaveDays";
import {useContext} from "react";
import {DateSelectionContext} from "../../../../../../store/date-selection-context";

export default function TableEmployeeOverview(
    {
        sortedTimesheet = [],
        formattedDate,
        onTimesUpdate,
    }
    ) {
    const { selectedMonth } = useContext(DateSelectionContext);

    return (
        <div data-testid='tables-content' id="table-content">
            {sortedTimesheet.map((timesheet, timesheetIndex) => {
                const employeeData = timesheet.employee;
                const employeeTimes = timesheet.times;
                const totalBalance = calculateTotalBalance(employeeTimes);
                const annualLeaveDays = calculateAnnualLeaveDays(timesheet.times);
                const totalBusinessTripDays = calculateBusinessTripDays(timesheet.times);
                const totalSickLeaveDays = calculateTotalSickLeaveDays(timesheet.times);
                const totalDaysInMonth = calculateBusinessDaysInMonth(selectedMonth);
                const totalRecordedDays = timesheet.times.length;

                return (
                    <div data-testid={`table-content-timesheet-${timesheetIndex}`} key={timesheetIndex}>
                        <TableSummary
                            timesheetIndex={timesheetIndex}
                            employeeData={employeeData}
                            annualLeaveDays={annualLeaveDays}
                            totalBusinessTripDays={totalBusinessTripDays}
                            totalDaysInMonth={totalDaysInMonth}
                            formattedDate={formattedDate}
                            totalSickLeaveDays={totalSickLeaveDays}
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
    formattedDate: PropTypes.string,
    onTimesUpdate: PropTypes.func,
};
