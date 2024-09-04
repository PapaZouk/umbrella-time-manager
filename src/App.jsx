import "./App.css";
import {useEffect, useState} from "react";
import {DaySelector, EmployeeSelector, EmployeeTable, MonthSelector, TimesheetController,} from "./features/business";
import Header from "./features/ui/header/Header";
import {handleDateChange} from "./features/utils";
import {Container, ErrorMessage, SuccessMessage} from "./features/shared";
import {useEmployeeTimesheet, useMonthDays} from "./features/hooks";
import TimesController from "./features/controller/TimesController";
import Popup from "./features/shared/popups/Popup";

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
  setSuccessMessage,
  popupContent,
  setPopupContent,
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
      <TimesController
          employee={selectedEmployee}
          month={selectedMonth}
          day={selectedDay}
          onTimesheetUpdate={handleTimesheetUpdate}
          setError={setError}
          setPopupContent={setPopupContent}
      />
  </Container>

   <Container fadeIn={fadeIn}>
    <TimesheetController
     timesheet={employeeTimesheet}
     selectedMonth={selectedMonth}
     resetTimesheet={resetTimesheet}
     setError={setError}
     setSuccessMessage={setSuccessMessage}
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
   <Popup content={popupContent} />
  </>
 );
}

export default App;
