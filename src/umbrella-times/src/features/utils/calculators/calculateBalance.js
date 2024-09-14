import moment from "moment";

export function calculateBalance(checkIn, checkOut, workingHours) {
    const workingMinutes = workingHours * 60;
    const checkOutTime = moment(checkOut, 'HH:mm');
    const checkInTime = moment(checkIn, 'HH:mm');

    const checkOutToCheckInMinutes = checkOutTime.diff(checkInTime, 'minutes');


    return checkOutToCheckInMinutes - workingMinutes;
}

export function calculateTotalBalance(times) {
    return times.reduce((total, time) => total + time.balance, 0);
}

export function calculateTotalHoursAndMinutes(minutes) {
    const hours = Math.abs(Math.trunc(minutes / 60));
    const remainingMinutes = Math.abs(minutes % 60);
    let totalHoursAndMinutes;

    if (minutes < 0) {
        totalHoursAndMinutes = `-${hours}.${remainingMinutes}`;
    } else {
        totalHoursAndMinutes = `${hours}.${remainingMinutes}`;
    }
    return totalHoursAndMinutes;
}
