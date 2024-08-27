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
import React from "react";
import TimesheetsController from "./features/business/TimesheetsController";
import Container from "./features/shared/container/Container";

function App() {
 const [selectedMonth, setSelectedMonth] = useState();
 const [selectedDay, setSelectedDay] = useState(null);
 const [fadeIn, setFadeIn] = useState(false);

 const days = useMonthDays(selectedMonth) || [];
 const {
  selectedEmployee,
  employeeTimesheets,
  error,
  successMessage,
  setError,
  setSuccesMessage,
  handleEditedTimesheets,
  isMonthLocked,
  handleEmployeeSelect,
  handleTimesheetsUpdate,
  resetTimesheets,
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
     onTimesheetsUpdate={handleTimesheetsUpdate}
     setError={setError}
    />
   </Container>

   <Container fadeIn={fadeIn}>
    <TimesheetsController
     timesheets={employeeTimesheets}
     selectedMonth={selectedMonth}
     resetTimesheets={resetTimesheets}
     setError={setError}
     setSuccesMessage={setSuccesMessage}
    />
   </Container>

   <Container fadeIn={fadeIn}>
    <EmployeeTable
     month={selectedMonth}
     timesheets={employeeTimesheets}
     handleEditedTimesheets={handleEditedTimesheets}
    />
   </Container>

   <ErrorMessage message={error} />
   <SuccessMessage message={successMessage} />
  </>
 );
}

export default App;
