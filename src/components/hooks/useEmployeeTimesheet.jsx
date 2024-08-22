import { useState } from 'react';
import { initialEmployee, initialTimesheets } from '../../resources/initialStates';
import { se } from 'date-fns/locale';

const useEmployeeTimesheet = () => {
   const [selectedEmployee, setSelectedEmployee] = useState(initialEmployee);
   const [employeeTimesheets, setEmployeeTimesheets] = useState(initialTimesheets);
   const [error, setError] = useState('');
   const [isMonthLocked, setIsMonthLocked] = useState(false);
   
   const handleEmployeeSelect = (employee) => setSelectedEmployee(employee);

    const handleTimesheetsUpdate = (newTimesheet) => {
        if (!newTimesheet.times[0].day) {
            setError('Wybierz dzień aby dodać godziny pracy.');
        }
        if (!newTimesheet.employee.name && !newTimesheet.e) {
            setError('Wybierz pracownika.');
        }
        if ((!newTimesheet.times[0].checkIn || !newTimesheet.times[0].checkOut) && !newTimesheet.times[0].isHoliday) {
            setError('Wybierz godziny przyjścia i wyjścia.');
        }

        setEmployeeTimesheets((previousTimesheets) => {
            const updatedTimesheets = previousTimesheets.map((timesheet) => {
                if (
                    timesheet.employee.name === newTimesheet.employee.name &&
                    timesheet.employee.surname === newTimesheet.employee.surname
                ) {
                    const dayExists = timesheet.times.some(
                        time => time.day === newTimesheet.times[0].day
                    );

                    if (dayExists) {
                        setError('Godziny dla wybranego dnia już dodano. Wybierz kolejny dzień.');
                        return timesheet;
                    } else {
                        return {
                            ...timesheet,
                            times: [...timesheet.times, newTimesheet.times[0]]
                        };
                    }
                }
                return timesheet;
            });

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
            console.log('Updated timesheets: ', updatedTimesheets);
            return updatedTimesheets;
        });
    };

    const resetTimesheets = () => {
        setSelectedEmployee(initialEmployee);
        setEmployeeTimesheets(initialTimesheets);
        setIsMonthLocked(false);
    };

    return {
        selectedEmployee,
        employeeTimesheets,
        error,
        setError,
        isMonthLocked,
        handleEmployeeSelect,
        handleTimesheetsUpdate,
        resetTimesheets,
    };
};

export default useEmployeeTimesheet;