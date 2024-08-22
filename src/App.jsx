import './App.css';
import { useState } from 'react';
import {
  DaySelector,
  EmployeeSelector,
  EmployeeTable,
  MonthSelector,
  SaveTimesheet,
  TimesheetSelector,
} from './components/business';
import Header from './components/header/Header';
import { handleDateChange } from './utils/HandleDateChange';
import { ErrorMessage } from './components/utils';
import { employeesData } from './resources/employeesData';
import { useMonthDays, useEmployeeTimesheet } from './components/hooks';

function App() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

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
  }, [selectedDay, selectedEmployee.workingHours]);

  function handleOnSave(timesheets) {
    if (timesheets.length === 0) {
      setError('Brak godzin do zapisania. Wypełnij godziny pracy.');
      return;
    }
    resetTimesheets();
    setSelectedDay(null);
  }

  return (
    <>
      <Header />

      <div className={`container ${fadeIn ? 'container-appear' : ''}`}>
        <div className="controls">
          <MonthSelector onMonthChange={setSelectedMonth} disabled={isMonthLocked} />
          <DaySelector days={days} onDayChange={(day) => handleDateChange(day, selectedMonth, setSelectedDay, setError)} />
        </div>
        <ErrorMessage message={error} />
      </div>

      <div className={`container ${fadeIn ? 'container-appear' : ''}`}>
        <div className="info-row">
          <EmployeeSelector onEmployeeSelect={handleEmployeeSelect} employees={employeesData} />
          {selectedEmployee.workingHours && (
            <div className="working-hours-frame">
              <span className="working-hours">
                Godziny pracy: {selectedEmployee.workingHours}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={`container ${fadeIn ? 'container-appear' : ''}`}>
        <h3>Wybierz godziny pracy</h3>
        <TimesheetSelector
          employee={selectedEmployee}
          month={selectedMonth}
          day={selectedDay}
          onTimesheetsUpdate={handleTimesheetsUpdate}
        />
      </div>

      <EmployeeTable month={selectedMonth} timesheets={employeeTimesheets} />
      <SaveTimesheet timesheets={employeeTimesheets} onSave={handleOnSave} />
    </>
  );
}

export default App;
