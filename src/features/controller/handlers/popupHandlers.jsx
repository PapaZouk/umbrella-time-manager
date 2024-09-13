import TimesInputs from "../../business/TimesInputs";
import DayOffPopup from "../../shared/popups/DayOffPopup";
import TrainingPopup from "../../shared/popups/TrainingPopup";
import {CreateTimesheet} from "../../utils/factory/TimesheetFactory";

export function showAddTimesInputs(
    setPopupContent,
    handleCloseTimesInputsPopup,
    closePopup
    )
{
    setPopupContent(
        <TimesInputs
            handleCloseTimesInputs={handleCloseTimesInputsPopup}
            handleCancel={closePopup}
        />
    );
};


export function showDayOffPopup(
    setPopupContent,
    handleSaveDayOff,
    closePopup
    )
{
    setPopupContent(
        <DayOffPopup
            onSaveDayOff={handleSaveDayOff}
            handleCancel={closePopup}
        />
    );
};

export function showAddTrainingPopup(
        setPopupContent,
        handleTrainingButton,
        closePopup
    )
{
    setPopupContent(
        <TrainingPopup
            onSaveTraining={handleTrainingButton}
            handleCancel={closePopup}
        />
    );
};

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
