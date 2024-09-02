import {fireEvent, render, screen} from '@testing-library/react';
import * as Hooks from '../../features/hooks';
import * as Utils from '../../features/utils';
import App from "../../App";

jest.mock('../../features/hooks');
jest.mock('../../features/utils', () => ({
    handleDateChange: jest.fn(),
}));
jest.mock('../../features/business', () => ({
    DaySelector: jest.fn(({ days, onDayChange }) => (
        <div data-testid='day-selector' onClick={() => onDayChange('test-day')}>
            {days.length ? (<div data-testid='days-content'>Days Content</div>) : (<div>No Days</div>)}
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

jest.mock('../../features/shared/messages', () => ({
    ErrorMessage: jest.fn(() => <div data-testid='error-message'/>),
    SuccessMessage: jest.fn(() => <div data-testid='success-message'/>),
}));

jest.mock('../../features/ui/header/Header', () => jest.fn(() => <div data-testid='header'/>));
jest.mock('../../features/shared/container/Container', () => ({
    Container: jest.fn(({ children }) => <div data-testid='container'>{children}</div>)
}));

describe('App', () => {
    beforeEach(() => {
        Hooks.useEmployeeTimesheet.mockReturnValue({
            selectedEmployee: null,
            employeeTimesheet: [],
            error: '',
            successMessage: '',
            setError: jest.fn(),
            setSuccessMessage: jest.fn(),
            handleEditedTimesheet: jest.fn(),
            isMonthLocked: false,
            handleEmployeeSelect: jest.fn(),
            handleTimesheetUpdate: jest.fn(),
            resetTimesheet: jest.fn(),
        });

        Hooks.useMonthDays.mockReturnValue([]);
        Utils.handleDateChange.mockImplementation((day, selectedMonth, setSelectedDay) => {
            setSelectedDay(day);
        });
    });

    test("renders app component without crashing", () => {
        const { getByTestId } = render(<App />);

        expect(getByTestId('header')).toBeInTheDocument();
        expect(getByTestId('employee-selector')).toBeInTheDocument();
        expect(getByTestId('employee-table')).toBeInTheDocument();
        expect(getByTestId('month-selector')).toBeInTheDocument();
        expect(getByTestId('timesheet-selector')).toBeInTheDocument();
        expect(getByTestId('timesheet-controller')).toBeInTheDocument();
        expect(getByTestId('error-message')).toBeInTheDocument();
        expect(getByTestId('success-message')).toBeInTheDocument();
    });

    test('renders and interacts with DaySelector', () => {
        render(<App />);

        const daySelector = screen.getByTestId('day-selector');
        expect(daySelector).toBeInTheDocument();

        fireEvent.click(daySelector);

        expect(Utils.handleDateChange).toHaveBeenCalledWith(
            'test-day',
            undefined,
            expect.any(Function),
            expect.any(Function),
        );
    });

    test('renders with days from useMonthDays', () => {
       Hooks.useMonthDays.mockReturnValue(['2024-06', '2024-07']);
       render(<App />);

       expect(screen.getByTestId('day-selector')).toBeInTheDocument();
       expect(screen.getByTestId('days-content')).toBeInTheDocument();
    });

    test('renders without days from useMonthDays', () => {
       Hooks.useMonthDays.mockReturnValue([]);
       render(<App />);

       expect(screen.getByTestId('day-selector')).toBeInTheDocument();
       expect(screen.getByText('No Days')).toBeInTheDocument();
    });

    test('useMonthDays is called with selectedMonth', () => {
        render(<App />);

        const monthSelector = screen.getByTestId('month-selector');
        fireEvent.click(monthSelector);

        expect(Hooks.useMonthDays).toHaveBeenCalledWith('2024-08');
    });
});
