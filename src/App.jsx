import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import moment from 'moment';
import MonthSelector from './components/MonthSelector';
import DaySelector from './components/DaySelector';
import EmployeeSelector from './components/EmployeeSelector';
import TimesheetSelector from './components/TimesheetSelector';
import EmployeeTable from './components/EmployeeTable';
import { handleDateChange } from './utils/HandleDateChange';
import ErrorMessage from './components/errors/ErrorMessage';
import { employeesData } from './resources/employeesData';
import SaveTimesshet from './components/SaveTimesheet';

const initialEmployee = {
  name: '',
  surname: '',
  workingHours: '',
};

const initialTimesheets = [];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isMonthLocked, setIsMonthLocked] = useState(false);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [error, setError] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(initialEmployee);
  const [employeeTimesheets, setEmployeeTimesheets] = useState(initialTimesheets);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-').map(Number);
      const daysInMonth = moment({ year, month: month - 1 }).daysInMonth();
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    }
  }, [selectedMonth]);

  useEffect(() => {
    setFadeIn(true);
  }, [selectedDay, selectedEmployee.workingHours]);

  function handleEmployeeSelect(employee) {
    setSelectedEmployee(employee);
  }

  function handleTimesheetsUpdate(newTimesheet) {
    if (!newTimesheet.times[0].day) {
      setError('Wybierz dzień aby dodać godziny pracy.');
      return;
    }

    if (!newTimesheet.employee.name) {
      setError('Wybierz pracownika.');
      return;
    }

    if ((!newTimesheet.times[0].checkIn || !newTimesheet.times[0].checkOut) && !newTimesheet.times[0].isHoliday) {
      setError('Wybierz godziny przyjścia i wyjścia');
      return;
    }

    setEmployeeTimesheets((previousTimesheets) => {
      const updatedTimesheets = previousTimesheets.map(timesheet => {
        if (
          timesheet.employee.name === newTimesheet.employee.name &&
          timesheet.employee.surname === newTimesheet.employee.surname
        ) {
          const dayExists = timesheet.times.some(
            time => time.day === newTimesheet.times[0].day
          );

          if (dayExists) {
            setError('Godziny dla wybranego dnia już dodano. Wybierz kolejny dzień.');
            setSelectedDay(null);
            return timesheet;
          } else {
            return {
              ...timesheet,
              times: [...timesheet.times, newTimesheet.times[0]],
            };
          }
        }
        return timesheet;
      });

      // If the timesheet didn't exist, add a new one
      if (
        !previousTimesheets.some(
          timesheet =>
            timesheet.employee.name === newTimesheet.employee.name &&
            timesheet.employee.surname === newTimesheet.employee.surname
        )
      ) {
        updatedTimesheets.push(newTimesheet);
      }

      setIsMonthLocked(true);
      return updatedTimesheets;
    });
  }

  function handleOnSave() {
    if (employeeTimesheets.length === 0) {
      setError('Brak godzin do zapisania. Wypełnij godziny pracy.');
      return;
    }
    setIsMonthLocked(false);
    setSelectedEmployee(initialEmployee);
    setEmployeeTimesheets(initialTimesheets);
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
      <SaveTimesshet timesheets={employeeTimesheets} onSave={handleOnSave}/>
    </>
  );
}

export default App;
