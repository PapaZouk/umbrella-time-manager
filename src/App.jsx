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

const initialEmployee = {
  name: '',
  surname: '',
  workingHours: '',
};

const timesheets = [];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [error, setError] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(initialEmployee);
  const [employeeTimesheets, setEmployeeTimesheets] = useState(timesheets);
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

    const existingTimesheetIndex = employeeTimesheets.findIndex(
      (timesheet) =>
        timesheet.employee.name === newTimesheet.employee.name &&
        timesheet.employee.surname === newTimesheet.employee.surname
    );
    const existingTimesheet = employeeTimesheets[existingTimesheetIndex];

    if (existingTimesheet) {
      if (existingTimesheet.times[0].day === newTimesheet.times[0].day) {
        setError('Godziny dla wybranego dnia już dodano. Wybierz kolejny dzień.')
        setSelectedDay(null);
        return;
      } else {
        console.log('Adding new times: ', existingTimesheet);
        existingTimesheet.times.push(newTimesheet.times[0]);
        // setEmployeeTimesheets((previousTimesheets) => {
        //   const updatedTimesheets = [...previousTimesheets];
        //   updatedTimesheets.push(existingTimesheet);
        //   return updatedTimesheets;
        // });
      }
    } else {
      setEmployeeTimesheets((previousTimesheets) => {
        const updatedTimesheets = [...previousTimesheets];
        updatedTimesheets.push(newTimesheet);
        return updatedTimesheets;
      });
    }

  }

  function handlePrintTable() {
    console.log(employeeTimesheets);
  }

  return (
    <>
      <Header />
      <div className={`container ${fadeIn ? 'container-appear' : ''}`}>
        <div className="controls">
          <MonthSelector onMonthChange={setSelectedMonth} />
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
      {employeeTimesheets.length > 0 && <EmployeeTable test={handlePrintTable} />}
    </>
  );
}

export default App;
