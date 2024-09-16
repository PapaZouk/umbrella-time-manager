import {fireEvent, render, screen} from '@testing-library/react';
import TimesController from "../../../../src/features/controller/TimesController";
import {generateEmployeeMock} from "../../_mocks/generateEmployee.mock";
import TimesInputs from "../../../../src/features/business/TimesInputs";
import {PopupContext} from "../../../../../store/popups-context";
import {EmployeeTimesheetContext} from "../../../../../store/employee-timesheet-context";
import {MessagesContext} from "../../../../../store/messages-context";
import {DateSelectionContext} from "../../../../../store/date-selection-context";

jest.mock("../../../../src/features/business/TimesInputs");
jest.mock("../../../../src/features/shared/popups/DayOffPopup");
jest.mock("../../../../src/features/utils");

describe('TimesController', () => {
    const employee = generateEmployeeMock();
    const addTimesButtonId = 'time-controller-add-button';
    const addDayOffId = 'time-controller-day-off-button';
    const addBusinessTripId = 'time-controller-business-trip-button';
    const addTrainingButtonId = 'time-controller-business-training-button';

    const month = '2024-08';
    const day = '2';

    const popupContextProviderValueMock = {
        closePopup: jest.fn(),
        setPopupContent: jest.fn(),
    };

    const employeeTimesheetContextValueMock = {
      selectedEmployee: employee,
      updateTimesheet: jest.fn(),
    };

    const messagesContextValueMock = {
      setErrorMessage: jest.fn(),
    };

    const dateSelectionContextMock = {
        selectedMonth: month,
        selectedDay: day,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
       jest.useRealTimers();
        jest.resetAllMocks();
    });

    test('renders all buttons', () => {
        render(
            <PopupContext.Provider value={popupContextProviderValueMock}>
                <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                    <MessagesContext.Provider value={messagesContextValueMock}>
                        <DateSelectionContext.Provider value={dateSelectionContextMock}>
                            <TimesController />
                        </DateSelectionContext.Provider>
                    </MessagesContext.Provider>
                </EmployeeTimesheetContext.Provider>
            </PopupContext.Provider>
        );

        const addTimesButton = screen.getByTestId(addTimesButtonId);
        const annualLeaveButton = screen.getByTestId(addDayOffId);
        const businessTripButton = screen.getByTestId(addBusinessTripId);
        const addTrainingButton = screen.getByTestId(addTrainingButtonId);

        expect(addTimesButton).toBeVisible();
        expect(annualLeaveButton).toBeVisible();
        expect(businessTripButton).toBeVisible();
        expect(addTrainingButton).toBeVisible();
    });

    test('calls setPopupContent with TimesInputs when handleAddTime is triggered', () => {
        TimesInputs.mockImplementation(() => <div data-testid="mock-times-input" />);

        render(
            <PopupContext.Provider value={popupContextProviderValueMock}>
                <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                    <MessagesContext.Provider value={messagesContextValueMock}>
                        <DateSelectionContext.Provider value={dateSelectionContextMock}>
                            <TimesController />
                        </DateSelectionContext.Provider>
                    </MessagesContext.Provider>
                </EmployeeTimesheetContext.Provider>
            </PopupContext.Provider>
        );

        const addButton = screen.getByTestId(addTimesButtonId);
        fireEvent.click(addButton);

        expect(popupContextProviderValueMock.setPopupContent).toHaveBeenCalled();
        expect(popupContextProviderValueMock.setPopupContent).toHaveBeenCalledWith(expect.anything());
    });

    test('renders error when month is not provided', () => {
        const dateSelectionContextMock = {
            selectedMonth: '',
            selectedDay: day,
        };
        render(
            <PopupContext.Provider value={popupContextProviderValueMock}>
                <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                    <MessagesContext.Provider value={messagesContextValueMock}>
                        <DateSelectionContext.Provider value={dateSelectionContextMock}>
                            <TimesController />
                        </DateSelectionContext.Provider>
                    </MessagesContext.Provider>
                </EmployeeTimesheetContext.Provider>
            </PopupContext.Provider>
        );

       const addButton = screen.getByTestId(addTimesButtonId);
       fireEvent.click(addButton);

       expect(messagesContextValueMock.setErrorMessage).toHaveBeenCalledWith("Wybierz miesiąc");
       jest.advanceTimersByTime(2000);
       expect(messagesContextValueMock.setErrorMessage).toHaveBeenCalledWith("");
    });

    test('renders error when day is not provided', () => {
        const dateSelectionContextMock = {
            selectedMonth: month,
            selectedDay: '',
        };
        render(
            <PopupContext.Provider value={popupContextProviderValueMock}>
                <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                    <MessagesContext.Provider value={messagesContextValueMock}>
                        <DateSelectionContext.Provider value={dateSelectionContextMock}>
                            <TimesController />
                        </DateSelectionContext.Provider>
                    </MessagesContext.Provider>
                </EmployeeTimesheetContext.Provider>
            </PopupContext.Provider>
        );

       const addButton = screen.getByTestId(addTimesButtonId);
       fireEvent.click(addButton);

       expect(messagesContextValueMock.setErrorMessage).toHaveBeenCalledWith("Wybierz dzień");
       jest.advanceTimersByTime(2000);
       expect(messagesContextValueMock.setErrorMessage).toHaveBeenCalledWith("");
    });

    test('renders error when employee name and surname is not provided', () => {
        const employeeTimesheetContextValueMock = {
            selectedEmployee: { name: '', surname: ''},
            updateTimesheet: jest.fn(),
        };
        render(
            <PopupContext.Provider value={popupContextProviderValueMock}>
                <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                    <MessagesContext.Provider value={messagesContextValueMock}>
                        <DateSelectionContext.Provider value={dateSelectionContextMock}>
                            <TimesController />
                        </DateSelectionContext.Provider>
                    </MessagesContext.Provider>
                </EmployeeTimesheetContext.Provider>
            </PopupContext.Provider>
        );

       const addButton = screen.getByTestId(addTimesButtonId);
       fireEvent.click(addButton);

       expect(messagesContextValueMock.setErrorMessage).toHaveBeenCalledWith("Wybierz pracownika");
       jest.advanceTimersByTime(2000);
       expect(messagesContextValueMock.setErrorMessage).toHaveBeenCalledWith("");
    });

    test('displays error when trying to add business trip without employee', () => {
        const employeeTimesheetContextValueMock = {
            selectedEmployee: undefined,
            updateTimesheet: jest.fn(),
        };
        render(
            <PopupContext.Provider value={popupContextProviderValueMock}>
                <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                    <MessagesContext.Provider value={messagesContextValueMock}>
                        <DateSelectionContext.Provider value={dateSelectionContextMock}>
                            <TimesController />
                        </DateSelectionContext.Provider>
                    </MessagesContext.Provider>
                </EmployeeTimesheetContext.Provider>
            </PopupContext.Provider>
        );

        const businessTripButton = screen.getByTestId('time-controller-business-trip-button');
        fireEvent.click(businessTripButton);

        expect(messagesContextValueMock.setErrorMessage).toHaveBeenCalledWith('Wybierz pracownika');

        jest.advanceTimersByTime(2000);
        expect(messagesContextValueMock.setErrorMessage).toHaveBeenCalledWith('');
    });

    test('calls updateTimesheet with the correct data for business trip', () => {
        render(
            <PopupContext.Provider value={popupContextProviderValueMock}>
                <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                    <MessagesContext.Provider value={messagesContextValueMock}>
                        <DateSelectionContext.Provider value={dateSelectionContextMock}>
                            <TimesController />
                        </DateSelectionContext.Provider>
                    </MessagesContext.Provider>
                </EmployeeTimesheetContext.Provider>
            </PopupContext.Provider>
        );

        const businessTripButton = screen.getByTestId(addBusinessTripId);
        fireEvent.click(businessTripButton);

        jest.runAllTimers();

        expect(employeeTimesheetContextValueMock.updateTimesheet).toHaveBeenCalledWith({
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
