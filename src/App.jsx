import "./App.css";
import { useState } from "react";
import {
 DaySelector,
 EmployeeSelector,
 EmployeeTable,
 MonthSelector,
 TimesheetSelector,
} from "./components/business";
import Header from "./components/header/Header";
import { handleDateChange } from "./utils/HandleDateChange";
import { ErrorMessage } from "./components/utils";
import { employeesData } from "./resources/employeesData";
import { useMonthDays, useEmployeeTimesheet } from "./components/hooks";
import React from "react";
import TimesheetsController from "./components/business/TimesheetsController";
import Container from "./components/business/Container";

function App() {
 const [selectedMonth, setSelectedMonth] = useState(null);
 const [selectedDay, setSelectedDay] = useState(null);
 const [fadeIn, setFadeIn] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");

 const days = useMonthDays(selectedMonth) || [];
 const {
  selectedEmployee,
  employeeTimesheets,
  error,
  setError,
  isMonthLocked,
  handleEmployeeSelect,
  handleTimesheetsUpdate,
  resetTimesheets,
 } = useEmployeeTimesheet();

 useState(() => {
  setFadeIn(true);
 }, [selectedDay, selectedEmployee]);

 function handleOnSave(timesheets) {
  if (timesheets.length === 0) {
   setError("Brak godzin do zapisania. Wypełnij godziny pracy.");
   return;
  }
  resetTimesheets();
  setSelectedDay(null);
 }

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
     handleOnSave={handleOnSave}
     setError={setError}
    />
   </Container>

   <Container fadeIn={fadeIn}>
    <EmployeeTable month={selectedMonth} timesheets={employeeTimesheets} />
   </Container>

   <ErrorMessage message={error} />
  </>
 );
}

export default App;
