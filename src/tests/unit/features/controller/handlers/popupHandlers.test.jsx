import {
    handleDayOffType,
    showAddTimesInputs,
    showAddTrainingPopup,
    showDayOffPopup
} from '../../../../../features/controller/handlers/popupHandlers';
import DayOffPopup from "../../../../../features/shared/popups/DayOffPopup";
import TrainingPopup from "../../../../../features/shared/popups/TrainingPopup";
import TimesInputs from "../../../../../features/business/TimesInputs";
import {CreateTimesheet} from "../../../../../features/utils/factory/TimesheetFactory";

jest.mock('../../../../../features/utils/factory/TimesheetFactory', () => ({
    CreateTimesheet: jest.fn(),
}));

describe('popupHandlers', () => {
    test('display TimesInput component correctly', () => {
        const setPopupContentMock = jest.fn();
        const handleCloseTimesInputsPopupMock = jest.fn();
        const closePopupMock = jest.fn();

        showAddTimesInputs(
            setPopupContentMock,
            handleCloseTimesInputsPopupMock,
            closePopupMock,
        );

        expect(setPopupContentMock).toHaveBeenCalledWith(
            <TimesInputs
                handleCloseTimesInputs={handleCloseTimesInputsPopupMock}
                handleCancel={closePopupMock}
            />
        );
    });

    test('displays DayOffPopup component correctly', () => {
        const setPopupContentMock = jest.fn();
        const handleSaveDayOffMock = jest.fn();
        const closePopupMock = jest.fn();

        showDayOffPopup(
            setPopupContentMock,
            handleSaveDayOffMock,
            closePopupMock,
        );

        expect(setPopupContentMock).toHaveBeenCalledWith(
            <DayOffPopup
                onSaveDayOff={handleSaveDayOffMock}
                handleCancel={closePopupMock}
            />
        );
    });
    test('displays TrainingPopup component correctly', () => {
        const setPopupContentMock = jest.fn();
        const handleTrainingButtonMock = jest.fn();
        const closePopupMock = jest.fn();

        showAddTrainingPopup(
            setPopupContentMock,
            handleTrainingButtonMock,
            closePopupMock,
        );

        expect(setPopupContentMock).toHaveBeenCalledWith(
            <TrainingPopup
                onSaveTraining={handleTrainingButtonMock}
                handleCancel={closePopupMock}
            />
        );
    });

    test.each(
        [
            { dayOffType: 'Zwolnienie lekarskie', expected: { isSickLeave: true } },
            { dayOffType: 'Bezpłatny urlop', expected: { isUnpaidLeave: true } },
            { dayOffType: 'Urlop macierzyński', expected: { isMaternityLeave: true } },
            { dayOffType: 'Urlop okazjonalny', expected: { isOccasionalLeave: true } },
            { dayOffType: 'Urlop wychowawczy', expected: { isParentalLeave: true } },
            { dayOffType: 'Any day off type', expected: { isHoliday: true } },
        ]
    )('calls onTimesheetUpdate with correct parameters for different dayOffType', (data) => {
        const onTimesheetUpdateMock = jest.fn();
        const resetCheckInAndCheckOutMock = jest.fn();
        const employee = { name: "John", surname: "Smith", workingHours: "07:30-15;30", annualLeave: "26"};
        const day = '14';
        const month = '2024-08';

        handleDayOffType(data.dayOffType, employee, month, day, onTimesheetUpdateMock, resetCheckInAndCheckOutMock);

        expect(CreateTimesheet).toHaveBeenCalledWith({
            employee,
            month,
            day,
            dayOff: data.dayOffType,
            ...data.expected,
        });

        expect(onTimesheetUpdateMock).toHaveBeenCalled();
        expect(resetCheckInAndCheckOutMock).toHaveBeenCalled();
    });
});
