import "./App.css";
import { useEffect, useState } from "react";
import {
 DaySelector,
 EmployeeSelector,
 EmployeeTable,
 MonthSelector,
 TimesheetSelector,
} from "./features/business";
import Header from "./features/ui/header/Header";
import { handleDateChange } from "./features/utils/handleDateChange";
import { ErrorMessage, SuccessMessage } from "./features/shared/messages";
import { useMonthDays, useEmployeeTimesheet } from "./features/hooks";
import { TimesheetController } from "./features/business";
import Container from "./features/shared/container/Container";

function App() {
 const [selectedMonth, setSelectedMonth] = useState();
 const [selectedDay, setSelectedDay] = useState(null);
 const [fadeIn, setFadeIn] = useState(false);

 const days = useMonthDays(selectedMonth) || [];
 const {
  selectedEmployee,
  employeeTimesheet,
  error,
  successMessage,
  setError,
  setSuccesMessage,
  handleEditedTimesheet,
  isMonthLocked,
  handleEmployeeSelect,
  handleTimesheetUpdate,
  resetTimesheet,
 } = useEmployeeTimesheet();

 useEffect(() => {
  setFadeIn(true);
 }, [selectedDay, selectedEmployee]);

 return (
  <>
   <Header />
   <Container fadeIn={fadeIn}>
    <div className="controls">
     <MonthSelector onMonthChange={setSelectedMonth} disabled={isMonthLocked} />
     <DaySelector
      days={days}
      onDayChange={(day) =>
       handleDateChange(day, selectedMonth, setSelectedDay, setError)
      }
     />
    </div>
   </Container>

   <Container fadeIn={fadeIn}>
    <EmployeeSelector onEmployeeSelect={handleEmployeeSelect} />
   </Container>

   <Container fadeIn={fadeIn}>
    <TimesheetSelector
     employee={selectedEmployee}
     month={selectedMonth}
     day={selectedDay}
     onTimesheetUpdate={handleTimesheetUpdate}
     setError={setError}
    />
   </Container>

   <Container fadeIn={fadeIn}>
    <TimesheetController
     timesheet={employeeTimesheet}
     selectedMonth={selectedMonth}
     resetTimesheet={resetTimesheet}
     setError={setError}
     setSuccesMessage={setSuccesMessage}
    />
   </Container>

   <Container fadeIn={fadeIn}>
    <EmployeeTable
     month={selectedMonth}
     timesheet={employeeTimesheet}
     handleEditedTimesheet={handleEditedTimesheet}
    />
   </Container>

   <ErrorMessage message={error} />
   <SuccessMessage message={successMessage} />
  </>
 );
}

export default App;
