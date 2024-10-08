export function isValidNewTimesheet(timesheet, setError) {
    if (!timesheet.times[0].day) {
        setError("Wybierz dzień aby dodać godziny pracy.");
        setTimeout(() => {
            setError('');
        }, 2000);
        return false;
    }

    if (!timesheet.employee.name && !timesheet.employee.surname) {
        setError("Wybierz pracownika");
        setTimeout(() => {
            setError('');
        }, 2000);
        return false;
    }

    if (timesheet.times[0].isBusinessTrip || timesheet.times[0].isHoliday) {
        return true;
    }

    if (
        (!timesheet.times[0].checkIn || !timesheet.times[0].checkOut) &&
        (timesheet.times[0].isHoliday || timesheet.times[0].isBusinessTrip)
    ) {
        setError("Wybierz godziny przyjścia i wyjścia.");
        setTimeout(() => {
            setError('');
        }, 2000);
        return false;
       }
    return true;
}
