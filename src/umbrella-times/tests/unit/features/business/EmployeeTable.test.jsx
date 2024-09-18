import {render, screen} from '@testing-library/react';
import {EmployeeTable} from "../../../../src/features/business";
import {generateTimesheetWithEmployeeAndSortedMock} from "../../_mocks/generateTimesheetWithEmployeeAndSorted.mock";
import {DateSelectionContext} from "../../../../../store/date-selection-context";
import {EmployeeTimesheetContext} from "../../../../../store/employee-timesheet-context";

jest.mock('../../../../src/features/utils/dateFormatter', () => ({
    dateFormatter: jest.fn(() => 'August 2024'),
}));
jest.mock('../../../../src/features/utils/sortTimesByDay', () => ({
    sortTimesByDay: jest.fn(() => [
        {
            day: 1,
            month: '2024-04',
            checkIn: '08:00',
            checkOut: '16:00',
            balance: 0,
            isHoliday: false,
        }
    ]),
}));

describe('EmployeeTable', () => {
    const dataSelectionContextValueMock = {
        selectedMonth: '2024-04',
    };

    const employeeTimesheetContextValueMock = {
        timesheet: [generateTimesheetWithEmployeeAndSortedMock()],
        editTimesheet: jest.fn(),
    };

    test('renders table content corretly', () => {
        render(
            <DateSelectionContext.Provider value={dataSelectionContextValueMock}>
                <EmployeeTimesheetContext.Provider value={employeeTimesheetContextValueMock}>
                    <EmployeeTable />
                </EmployeeTimesheetContext.Provider>
            </DateSelectionContext.Provider>
        );

        const tableContent = screen.getByTestId('tables-content');

        expect(tableContent).toBeInTheDocument();
    });
});
