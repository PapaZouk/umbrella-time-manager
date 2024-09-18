export function hasAllTimes(checkIn, checkOut, employee, setError) {
    if (
        (checkIn && checkOut && employee) &&
        (checkIn !== '' && checkOut !== '') &&
        (employee.name !== '' && employee.surname !== '')
    ) {
        return true;
    }
    setError("Uzupełnij wszystkie dane");
    setTimeout(() => {
        setError("");
    }, 2000);
    return false;
}
