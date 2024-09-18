import {createContext, useState} from "react";
import {isValidNewTimesheet} from "../umbrella-times/src/features/utils";
import {initialEmployee, initialTimesheet} from "../umbrella-times/src/resources/initialStates";
import PropTypes from "prop-types";

export const EmployeeTimesheetContext = createContext({
    timesheet: [],
    selectedEmployee: {},
    isMonthLocked: false,
    updateEmployee: () => {},
    editTimesheet: () => {},
    updateTimesheet: () => {},
    resetTimesheet: () => {},
});

export default function EmployeeTimesheetContextProvider({ children, setError }) {
    const [employeeTimesheet, setEmployeeTimesheet] = useState(initialTimesheet);
    const [selectedEmployee, setSelectedEmployee] = useState(initialEmployee);
    const [isMonthLocked, setIsMonthLocked] = useState(false);

    function updateEmployee(employee) {
        setSelectedEmployee(employee);
    }

    const resetTimesheet = () => {
        setSelectedEmployee(initialEmployee);
        setEmployeeTimesheet(initialTimesheet);
        // setIsMonthLocked(false);
        setError("");
    };

    function handleTimesheetEdit(editedTimesheet) {
        if (!isValidNewTimesheet(editedTimesheet, setError)) {
            return;
        }

        setSelectedEmployee((previousTimesheet) => {
            return previousTimesheet.map((timesheet) => ({
                ...timesheet,
                times: [...editedTimesheet.times],
            }));
        });
    }

    function handleTimesheetUpdate(newTimesheet) {
        console.log('Timesheet to update: ', newTimesheet);
        if (!isValidNewTimesheet(newTimesheet, setError)) {
            return;
        }

        setEmployeeTimesheet((previousTimesheet) => {
            const updatedTimesheet = previousTimesheet.map((timesheet) => {
                if (
                    timesheet.employee.name === newTimesheet.employee.name &&
                    timesheet.employee.surname === newTimesheet.employee.surname
                ) {
                    const dayExists = timesheet.times.some(
                        (time) => time.day === newTimesheet.times[0].day
                    );

                    if (dayExists) {
                        setError("Godziny dla wybranego dnia już dodano. Wybierz kolejny dzień.");
                        setTimeout(() => {
                            setError("");
                        }, 2000);
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

            if (
                !previousTimesheet.some(
                    (timesheet) =>
                        timesheet.employee.name === newTimesheet.employee.name &&
                        timesheet.employee.surname === newTimesheet.employee.surname
                )
            ) {
                updatedTimesheet.push(newTimesheet);
            }

            setIsMonthLocked(true);
            return updatedTimesheet;
        });
    };

    const employeeTimesheetContext = {
        timesheet: employeeTimesheet,
        selectedEmployee: selectedEmployee,
        isMonthLocked: isMonthLocked,
        updateEmployee: updateEmployee,
        editTimesheet: handleTimesheetEdit,
        updateTimesheet: handleTimesheetUpdate,
        resetTimesheet: resetTimesheet,
    }


    return (
      <EmployeeTimesheetContext.Provider value={employeeTimesheetContext}>
          {children}
      </EmployeeTimesheetContext.Provider>
    );
}

EmployeeTimesheetContextProvider.propTypes = {
    children: PropTypes.node,
    setError: PropTypes.func,
}
