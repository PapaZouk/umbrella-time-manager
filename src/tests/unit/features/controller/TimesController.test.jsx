import {fireEvent, render, screen} from '@testing-library/react';
import TimesController from "../../../../features/controller/TimesController";
import {generateEmployeeMock} from "../../_mocks/generateEmployee.mock";
import TimesInputs from "../../../../features/business/TimesInputs";

jest.mock("../../../../features/business/TimesInputs");
jest.mock("../../../../features/shared/popups/DayOffPopup");
jest.mock("../../../../features/utils");

describe('TimesController', () => {
    const employee = generateEmployeeMock();
    const addDayOffId = 'time-controller-day-off-button';
    const addBusinessTripId = 'time-controller-business-trip-button';
    const month = '2024-08';
    const day = '2';

    let mockOnTimesheetUpdate;
    let mockSetError;
    let mockSetPopupContent;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        mockOnTimesheetUpdate = jest.fn();
        mockSetError = jest.fn();
        mockSetPopupContent = jest.fn();
    });

    afterEach(() => {
       jest.useRealTimers();
    });

    const renderComponent = (props = {}) => {
        return render(
            <TimesController
                employee={employee}
                month={month}
                day={day}
                onTimesheetUpdate={mockOnTimesheetUpdate}
                setError={mockSetError}
                setPopupContent={mockSetPopupContent}
                {...props}
            />
        );
    }

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('renders all buttons', () => {
        renderComponent();

        const addButton = screen.getByTestId('time-controller-add-button');
        const annualLeaveButton = screen.getByTestId(addDayOffId);
        const businessTripButton = screen.getByTestId(addBusinessTripId);

        expect(addButton).toBeVisible();
        expect(annualLeaveButton).toBeVisible();
        expect(businessTripButton).toBeVisible();
    });

    test('calls setPopupContent with TimesInputs when handleAddTime is triggered', () => {
        TimesInputs.mockImplementation(() => <div data-testid="mock-times-input" />);

        renderComponent();

        const addButton = screen.getByTestId('time-controller-add-button');
        fireEvent.click(addButton);

        expect(mockSetPopupContent).toHaveBeenCalled();
        expect(mockSetPopupContent).toHaveBeenCalledWith(expect.anything()); // You might want to check the exact content
    });

    test('renders error when month is not provided', () => {
        renderComponent({ month: '' });

       const addButton = screen.getByTestId('time-controller-add-button');
       fireEvent.click(addButton);

       expect(mockSetError).toHaveBeenCalledWith("Wybierz miesiąc");
       jest.advanceTimersByTime(2000);
       expect(mockSetError).toHaveBeenCalledWith("");
    });

    test('renders error when day is not provided', () => {
        renderComponent({ day: '' });

       const addButton = screen.getByTestId('time-controller-add-button');
       fireEvent.click(addButton);

       expect(mockSetError).toHaveBeenCalledWith("Wybierz dzień");
       jest.advanceTimersByTime(2000);
       expect(mockSetError).toHaveBeenCalledWith("");
    });

    test('renders error when employee name and surname is not provided', () => {
        renderComponent({ employee: { name: '', surname: ''} });

       const addButton = screen.getByTestId('time-controller-add-button');
       fireEvent.click(addButton);

       expect(mockSetError).toHaveBeenCalledWith("Wybierz pracownika");
       jest.advanceTimersByTime(2000);
       expect(mockSetError).toHaveBeenCalledWith("");
    });

    test('displays error when trying to add business trip without employee', () => {
        renderComponent({ employee: { name: '', surname: '' } });

        const businessTripButton = screen.getByTestId('time-controller-business-trip-button');
        fireEvent.click(businessTripButton);

        expect(mockSetError).toHaveBeenCalledWith('Wybierz pracownika');

        jest.advanceTimersByTime(2000); // Fast-forward time to clear the error
        expect(mockSetError).toHaveBeenCalledWith('');
    });

    test('calls onTimesheetUpdate with the correct data for business trip', () => {
        renderComponent();

        const businessTripButton = screen.getByTestId(addBusinessTripId);
        fireEvent.click(businessTripButton);

        jest.runAllTimers();

        expect(mockOnTimesheetUpdate).toHaveBeenCalledWith({
            employee,
            times: [
                {
                    checkIn: "",
                    checkOut: "",
                    month,
                    day,
                    balance: 0,
                    dayOff: '',
                    isBusinessTrip: true,
                    isHoliday: false,
                    isMaternityLeave: false,
                    isOccasionalLeave: false,
                    isParentalLeave: false,
                    isSickLeave: false,
                    isUnpaidLeave: false,
                    isTraining: false,
                    trainingType: "",
                },
            ],
        });
    });
});
