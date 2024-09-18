import {render, screen} from '@testing-library/react';
import TimesApp from "../../src/TimesApp";
import {MessagesContext} from "../../../store/messages-context";

jest.mock('../../src/features/utils', () => ({
    handleDateChange: jest.fn(),
}));
jest.mock('../../src/features/business', () => ({
    DaySelector: jest.fn(() => (
        <div data-testid='day-selector' >
            <div data-testid='days-content'>Days Content</div>
        </div>
    )),
    EmployeeSelector: jest.fn(() => <div data-testid='employee-selector'/>),
    EmployeeTable: jest.fn(() => <div data-testid='employee-table'/>),
    MonthSelector: jest.fn(({ onMonthChange }) => (
        <div data-testid='month-selector' onClick={() => onMonthChange('2024-08')}>
            Month Selector
        </div>
    )),
    TimesheetSelector: jest.fn(() => <div data-testid='timesheet-selector'/>),
    TimesheetController: jest.fn(() => <div data-testid='timesheet-controller'/>),
}));

jest.mock('../../../umbrella-web-common/src/components/messages', () => ({
    ErrorMessage: jest.fn(() => <div data-testid='error-message'/>),
    SuccessMessage: jest.fn(() => <div data-testid='success-message'/>),
}));

jest.mock('../../src/features/ui/header/Header', () => jest.fn(() => <div data-testid='header'/>));
jest.mock('../../../umbrella-web-common/src/components/container/Container', () => ({
    Container: jest.fn(({ children }) => <div data-testid='container'>{children}</div>)
}));

describe('App', () => {
    const headerId = 'header';
    const monthSelectorId = 'month-selector';
    const daySelectorId = 'day-selector';
    const employeeSelectorId = 'employee-selector';
    const addTimesButtonId = 'time-controller-add-button';
    const addDayOffButtonId = 'time-controller-day-off-button';
    const addBusinessTripButtonId = 'time-controller-business-trip-button';
    const addTrainingButtonId = 'time-controller-business-training-button';
    const errorMessageId = 'error-message';
    const successMessageId = 'success-message';
    const employeeTableId = 'employee-table';

    const messagesContextValueMock = {
        setErrorMessage: jest.fn(),
    };

    test("renders app components without crashing", () => {
        render(
            <MessagesContext.Provider value={messagesContextValueMock}>
                <TimesApp />
            </MessagesContext.Provider>
        );

        expect(screen.getByTestId(headerId)).toBeInTheDocument();
        expect(screen.getByTestId(monthSelectorId)).toBeInTheDocument();
        expect(screen.getByTestId(daySelectorId)).toBeInTheDocument();
        expect(screen.getByTestId(employeeSelectorId)).toBeInTheDocument();
        expect(screen.getByTestId(addTimesButtonId)).toBeInTheDocument();
        expect(screen.getByTestId(addDayOffButtonId)).toBeInTheDocument();
        expect(screen.getByTestId(addBusinessTripButtonId)).toBeInTheDocument();
        expect(screen.getByTestId(addTrainingButtonId)).toBeInTheDocument();
        expect(screen.getByTestId(errorMessageId)).toBeInTheDocument();
        expect(screen.getByTestId(successMessageId)).toBeInTheDocument();
        expect(screen.getByTestId(employeeTableId)).toBeInTheDocument();
    });

    test('renders DaySelector', () => {
        render(
            <MessagesContext.Provider value={messagesContextValueMock}>
                <TimesApp />
            </MessagesContext.Provider>
        );

        const daySelector = screen.getByTestId(daySelectorId);
        expect(daySelector).toBeInTheDocument();
    });
});
