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