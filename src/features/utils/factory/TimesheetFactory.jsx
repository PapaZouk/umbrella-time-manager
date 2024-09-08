export function CreateTimesheet({
    employee = {
        name: "", surname: "", workingHours: "", annualLeave: "",
    },
    checkIn = "",
    checkOut = "",
    month = "",
    day = "",
    balance = 0,
    isHoliday = false,
    dayOff = "",
    isBusinessTrip = false,
    isSickLeave = false,
    isUnpaidLeave = false,
    isMaternityLeave = false,
    isOccasionalLeave = false,
    isParentalLeave = false,
} = {}){
    return {
        employee: {name: "", surname: "", workingHours: "", annualLeave: 0, ...employee},
        times: [
            {
                checkIn,
                checkOut,
                month,
                day,
                balance,
                isHoliday,
                dayOff,
                isBusinessTrip,
                isSickLeave,
                isUnpaidLeave,
                isMaternityLeave,
                isOccasionalLeave,
                isParentalLeave,
            },
        ],
    }
};
