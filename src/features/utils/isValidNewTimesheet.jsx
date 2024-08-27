import React from 'react'
import logger from 'react-logger';

export default function isValidNewTimesheet(timesheet, setError) {
    logger.info('Validating timesheet', timesheet);
    if (!timesheet.times[0].day) {
        setError("Wybierz dzień aby dodać godziny pracy.");
        setTimeout(() => {
            setError('');
        }, 2000);
        return false;
    }
    if (!timesheet.employee.name && !timesheet.e) {
        setError("Wybierz pracownika.");
        setTimeout(() => {
            setError('');
        }, 2000);
        return false;
    }
    if (
        (!timesheet.times[0].checkIn || !timesheet.times[0].checkOut) &&
        !timesheet.times[0].isHoliday
    ) {
        setError("Wybierz godziny przyjścia i wyjścia.");
        setTimeout(() => {
            setError('');
        }, 2000);
        return false;
       }
    return true;
}