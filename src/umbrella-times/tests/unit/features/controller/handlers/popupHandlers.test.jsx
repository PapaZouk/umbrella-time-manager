import {handleDayOffType,} from '../../../../../src/features/controller/handlers/popupHandlers';
import DayOffPopup from "../../../../../src/features/shared/popups/DayOffPopup";
import {CreateTimesheet} from "../../../../../src/features/utils/factory/TimesheetFactory";
import {useContext} from "react";
import {PopupContext} from "../../../../../../store/popups-context";

jest.mock('../../../../../src/features/utils/factory/TimesheetFactory', () => ({
    CreateTimesheet: jest.fn(),
}));

describe('popupHandlers', () => {
    test('displays DayOffPopup component correctly', () => {
        const setPopupContentMock = jest.fn();
        const handleSaveDayOffMock = jest.fn();
        const closePopupMock = jest.fn();

        const {setPopupContent} = useContext(PopupContext);
        setPopupContent(<DayOffPopup onSaveDayOff={setPopupContentMock}/>);

        expect(setPopupContentMock).toHaveBeenCalledWith(
            <DayOffPopup
                onSaveDayOff={handleSaveDayOffMock}
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
