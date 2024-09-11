import {render, screen, fireEvent} from '@testing-library/react';
import {TimesheetController} from "../../../../features/business";
import {generateTimesheetMock} from "../../_mocks/generateTimesheet.mock";
import { printTable } from "../../../../features/utils";

jest.mock('../../../../features/utils/printTable');
describe('TimesheetController', () => {
    const timesheetControllerId = 'timesheet-controller';
    const saveTimesheetButtonId = 'save-timesheet-button';
    const printButtonId = 'print-button';

    const timesheet = generateTimesheetMock();
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

    test('renders timesheet controller with print and save buttons', () => {
       render(
           <TimesheetController
           timesheet={timesheet}
           resetTimesheet={resetTimesheetMock}
           setError={setErrorMock}
           setSuccessMessage={setSuccessMock}
           />
       );

       const timesheetControllerContainer = screen.getByTestId(timesheetControllerId);
       expect(timesheetControllerContainer).toBeInTheDocument();

        const printButton = screen.getByTestId(printButtonId);
        expect(printButton).toBeInTheDocument();

        const saveTimesheetButton = screen.getByTestId(saveTimesheetButtonId);
        expect(saveTimesheetButton).toBeInTheDocument();
    });

    test('calls handlePrint when print button was clicked', () => {
        render(
            <TimesheetController
                timesheet={timesheet}
                resetTimesheet={resetTimesheetMock}
                setError={setErrorMock}
                setSuccessMessage={setSuccessMock}
            />
        );

        const printButton = screen.getByTestId(printButtonId);
        expect(printButton).toBeInTheDocument();

        fireEvent.click(printButton);
        expect(printTable).toHaveBeenCalled();
    });
});
