import {render, fireEvent} from '@testing-library/react';
import {TimesheetController} from "../../../../features/business";
import {generateTimesheetMock} from "../../_mocks/generateTimesheet.mock";
import { printTable } from "../../../../features/utils";

jest.mock('../../../../features/utils/printTable');

describe('TimesheetController', () => {
    const timesheet = generateTimesheetMock();
    const selectedMonth = '2024-08';
    const resetTimesheetMock = jest.fn();
    const setErrorMock = jest.fn();
    const setSuccessMock = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    test('renders timesheet controller with print, export and save buttons', () => {
       const { getByTestId } = render(
           <TimesheetController
           timesheet={timesheet}
           selectedMonth={selectedMonth}
           resetTimesheet={resetTimesheetMock}
           setError={setErrorMock}
           setSuccesMessage={setSuccessMock}
           />
       );

       const timesheetControllerContainer = getByTestId(/timesheet-controller/);
       expect(timesheetControllerContainer).toBeInTheDocument();

        const printButton = getByTestId(/print-button/);
        expect(printButton).toBeInTheDocument();

        const exportButton = getByTestId(/export-button/);
        expect(exportButton).toBeInTheDocument();

        const saveTimesheetButton = getByTestId(/save-timesheet-button/);
        expect(saveTimesheetButton).toBeInTheDocument();
    });

    test('calls handlePrint when print button was clicked', () => {
        const { getByTestId } = render(
            <TimesheetController
                timesheet={timesheet}
                selectedMonth={selectedMonth}
                resetTimesheet={resetTimesheetMock}
                setError={setErrorMock}
                setSuccesMessage={setSuccessMock}
            />
        );

        const printButton = getByTestId(/print-button/);
        expect(printButton).toBeInTheDocument();

        fireEvent.click(printButton);
        expect(printTable).toHaveBeenCalled();
    });

    test('calls handleControllerError when timesheet is empty nad export button was clicked', () => {
        const { getByTestId } = render(
            <TimesheetController
                timesheet={[]}
                selectedMonth={selectedMonth}
                resetTimesheet={resetTimesheetMock}
                setError={setErrorMock}
                setSuccesMessage={setSuccessMock}
            />
        );

        const exportButton = getByTestId(/export-button/);
        expect(exportButton).toBeInTheDocument();

        fireEvent.click(exportButton);
        expect(setErrorMock).toHaveBeenCalledWith('Brak godzin do exportowania');

        jest.advanceTimersByTime(2000);
        jest.runAllTimers();

        expect(setErrorMock).toHaveBeenCalledWith('');
    });
});
