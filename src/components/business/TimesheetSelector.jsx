import React from 'react';
import { useState } from 'react';
import { calculateBalance } from '../../utils/calculateBalance';
import styles from './TimesheetSelector.module.css';

export function TimesheetSelector({ employee, month, day, onTimesheetsUpdate }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const employeeTimesheet = {
        employee,
        times: [{
            checkIn: '',
            checkOut: '',
            month,
            day,
            balance: 0,
            isHoliday: false,
        }],
    };
        
    function handleChange(event, type) {
        if (type === 'check-in') {
            setCheckIn(event.target.value);
        } else if (type === 'check-out') {
            setCheckOut(event.target.value);
        }
    }

    function handleUpdate() {
        if (employeeTimesheet.employee && employeeTimesheet.times && employeeTimesheet.times.length > 0) {
            const balance = calculateBalance(checkIn, checkOut, 8);
            employeeTimesheet.times[0].checkIn = checkIn;
            employeeTimesheet.times[0].checkOut = checkOut;
            employeeTimesheet.times[0].balance = balance;
            onTimesheetsUpdate(employeeTimesheet);

            setCheckIn('');
            setCheckOut('');
        }
    }

    function handleHolidayLeave() {
        setCheckIn('');
        setCheckOut('');
        employeeTimesheet.times[0].checkIn = checkIn;
        employeeTimesheet.times[0].checkOut = checkOut;
        employeeTimesheet.times[0].isHoliday = true;
        employeeTimesheet.times[0].balance = 0;
        onTimesheetsUpdate(employeeTimesheet);
    }

    return (
        <div className={styles.container}>
            <span>
                <label
                    htmlFor="check-in"
                    className={styles.label}
                >Przyjście</label>
                <input
                    id='check-in'
                    type="time"
                    className={styles.input}
                    value={checkIn}
                    onChange={(e) => handleChange(e, "check-in")}
                />
                <label
                    htmlFor="check-out"
                    className={styles.label}
                >Wyjście</label>
                <input
                    id='check-out'
                    type="time"
                    className={styles.input}
                    value={checkOut}
                    onChange={(e) => handleChange(e, "check-out")}
                />
                <button
                className={styles.holidayButton}
                onClick={handleHolidayLeave}
                >Urlop
                </button>
                <button onClick={handleUpdate}>Dodaj</button>
            </span>
        </div>
    );
}