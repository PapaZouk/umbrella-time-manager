import {useContext, useEffect, useState} from "react";
import {dateFormatter, sortTimesByDay} from "../utils";
import TableEmployeeOverview from "../ui/table/employee/TableEmployeeOverview";
import {EmployeeTimesheetContext} from "../../../../store/employee-timesheet-context";
import {DateSelectionContext} from "../../../../store/date-selection-context";

export function EmployeeTable() {
 const { selectedMonth } = useContext(DateSelectionContext);
 const { timesheet, editTimesheet } = useContext(EmployeeTimesheetContext);

 const [sortedTimesheet, setSortedTimesheet] = useState(timesheet);

 useEffect(() => {
  setSortedTimesheet(
   timesheet.map((unsortedTimes) => ({
    ...unsortedTimes,
    sortedTimes: sortTimesByDay(unsortedTimes.times),
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
  editTimesheet(updatedTimesheet[index]);
 };

 const formattedDate = selectedMonth ? dateFormatter(selectedMonth) : "Wybierz miesiąc";

 return (
  <TableEmployeeOverview
      sortedTimesheet={sortedTimesheet}
      formattedDate={formattedDate}
      onTimesUpdate={onTimesUpdate}
  />
 );
}
