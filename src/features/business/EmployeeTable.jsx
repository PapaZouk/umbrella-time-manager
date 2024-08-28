import {useEffect, useState} from "react";
import {dateFormatter, sortTimesByDay} from "../utils";
import TableEmployeeOverview from "../ui/table/employee/TableEmployeeOverview";
import PropTypes from "prop-types";

export function EmployeeTable({ month, timesheet, handleEditedTimesheet }) {
 const [sortedTimesheet, setSortedTimesheet] = useState(timesheet);

 useEffect(() => {
  setSortedTimesheet(
   timesheet.map((timesheet) => ({
    ...timesheet,
    sortedTimes: sortTimesByDay(timesheet.times),
   }))
  );
 }, [timesheet]);

 const onTimesUpdate = (index, updatedTimes) => {
  const updatedTimesheet = [...sortedTimesheet];
  updatedTimesheet[index] = {
   ...updatedTimesheet[index],
   times: updatedTimes,
   sortedTimes: sortTimesByDay(updatedTimes),
  };
  setSortedTimesheet(updatedTimesheet);
  handleEditedTimesheet(updatedTimesheet[index]);
 };

 const formattedDate = month ? dateFormatter(month) : "Wybierz miesiąc";

 return (
  <TableEmployeeOverview
      sortedTimesheet={sortedTimesheet}
      month={month}
      formattedDate={formattedDate}
      onTimesUpdate={onTimesUpdate}
  />
 );
};

EmployeeTable.propTypes = {
 month: PropTypes.string,
 timesheet: PropTypes.array,
 handleEditedTimesheet: PropTypes.func,
};
