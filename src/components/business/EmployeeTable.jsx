import React, { useState, useEffect } from "react";
import { calculateTotalBalance } from "../../utils/calculateBalance";
import { dateFormatter } from "../../utils/dateFormatter";
import { calculateAnnualLeaveDays } from "../../utils/calculateAnnualLeaveDays";
import calculateBusinessDaysInMonth from "../../utils/calulculateBusinessDaysInMonth";
import { sortTimesByDay } from "../../utils/sortTimesByDay";
import TableSummary from "../ui/TableSummary";
import TableDetails from "../ui/TableDetails";

export function EmployeeTable({ month, timesheets }) {
  const [sortedTimesheets, setSortedTimesheets] = useState(timesheets);

  useEffect(() => {
    setSortedTimesheets(timesheets.map(timesheet => ({
      ...timesheet,
      sortedTimes: sortTimesByDay(timesheet.times),
    })));
  }, [timesheets]);

const onTimesUpdate = (index, updatedTimes) => {
  const updatedTimesheets = [...sortedTimesheets];
  updatedTimesheets[index] = {
    ...updatedTimesheets[index],
    times: updatedTimes,
    sortedTimes: sortTimesByDay(updatedTimes),
  };
  setSortedTimesheets(updatedTimesheets);
};

  const formattedDate = month ? dateFormatter(month) : "Wybierz miesiąc";

  return (
    <div id="table-content">
      {sortedTimesheets.map((timesheet, timesheetIndex) => {
        const employeeData = timesheet.employee;
        const employeeTimes = timesheet.times;
        const totalBalance = calculateTotalBalance(employeeTimes);
        const annualLeaveDays = calculateAnnualLeaveDays(timesheet.times);
        const totalDaysInMonth = calculateBusinessDaysInMonth(month);

        return (
          <div key={timesheetIndex}>
            <TableSummary
              timesheetIndex={timesheetIndex}
              employeeData={employeeData}
              annualLeaveDays={annualLeaveDays}
              totalDaysInMonth={totalDaysInMonth}
              formattedDate={formattedDate}
              totalBalance={totalBalance}
            />
            <TableDetails
              timesheetIndex={timesheetIndex}
              sortedTimes={timesheet.sortedTimes}
              onTimesUpdate={(updatedTimes) => onTimesUpdate(timesheetIndex, updatedTimes)}
            />
          </div>
        );
      })}
    </div>
  );
}
