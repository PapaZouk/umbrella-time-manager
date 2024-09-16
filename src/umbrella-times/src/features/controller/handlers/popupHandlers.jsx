import {CreateTimesheet} from "../../utils/factory/TimesheetFactory";

export function handleDayOffType(
    dayOffType,
    employee,
    month,
    day,
    onTimesheetUpdate,
    resetCheckInAndCheckOut
) {
    let timesheetData = {};

    switch (dayOffType) {
        case 'Zwolnienie lekarskie':
            timesheetData = { isSickLeave: true };
            break;
        case 'Bezpłatny urlop':
            timesheetData = { isUnpaidLeave: true };
            break;
        case "Urlop macierzyński":
            timesheetData = { isMaternityLeave: true };
            break;
        case "Urlop okazjonalny":
            timesheetData = { isOccasionalLeave: true };
            break;
        case "Urlop wychowawczy":
            timesheetData = { isParentalLeave: true };
            break;
        default:
            timesheetData = { isHoliday: true };
    }

    const newTimesheet = CreateTimesheet({
       employee,
       month,
       day,
       dayOff: dayOffType,
       ...timesheetData,
    });
    onTimesheetUpdate(newTimesheet);
    resetCheckInAndCheckOut();
};
