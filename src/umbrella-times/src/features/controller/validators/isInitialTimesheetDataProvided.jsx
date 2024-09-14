export function isInitialTimesheetDataProvided({month, day, employee, setError}) {
    if (!month) {
        setError('Wybierz miesiąc');
        setTimeout(() => {
            setError('');
        }, 2000);
        return false;
    } else if (!day) {
        setError('Wybierz dzień');
        setTimeout(() => {
            setError('');
        }, 2000);
        return false;
    } else if (!employee || employee.name === '' || employee.surname === '') {
        setError('Wybierz pracownika');
        setTimeout(() => {
            setError('');
        }, 2000);
        return false;
    } else {
        return true;
    }
}
