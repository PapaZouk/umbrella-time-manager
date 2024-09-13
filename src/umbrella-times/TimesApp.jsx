import "../App.css";
import {useEffect, useState} from "react";
import {DaySelector, EmployeeSelector, EmployeeTable, MonthSelector, TimesheetController,} from "./features/business";
import Header from "./features/ui/header/Header";
import {handleDateChange} from "./features/utils";
import {Container, ErrorMessage, SuccessMessage} from "./features/shared";
import {useEmployeeTimesheet, useMonthDays} from "./features/hooks";
import TimesController from "./features/controller/TimesController";
import Popup from "./features/shared/popups/Popup";

function TimesApp() {
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
  <Container fadeIn={fadeIn}>
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

   {employeeTimesheet.length > 0 ? (
       <>
        <Container fadeIn={fadeIn}>
         <TimesheetController
             timesheet={employeeTimesheet}
             resetTimesheet={resetTimesheet}
             setError={setError}
             setSuccessMessage={setSuccessMessage}
         />
        </Container>
       </>
   ) : ""}

    <EmployeeTable
     month={selectedMonth}
     timesheet={employeeTimesheet}
     handleEditedTimesheet={handleEditedTimesheet}
    />

   <ErrorMessage message={error} />
   <SuccessMessage message={successMessage} />
   <Popup content={popupContent} />
  </Container>
 );
}

export default TimesApp;
