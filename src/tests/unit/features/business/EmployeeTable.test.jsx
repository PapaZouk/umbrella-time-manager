import {render} from '@testing-library/react';
import {EmployeeTable} from "../../../../features/business";
import {sortTimesByDay} from "../../../../features/utils";
import {generateTimesheetWithEmployeeAndSortedMock} from "../../_mocks/generateTimesheetWithEmployeeAndSorted.mock";

jest.mock('../../../../features/utils/dateFormatter', () => ({
    dateFormatter: jest.fn(() => 'August 2024'),
}));
jest.mock('../../../../features/utils/sortTimesByDay', () => ({
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
    test('updates sortedTimesheet when timesheet prop changes', () => {
        const timesheet = [generateTimesheetWithEmployeeAndSortedMock()];
        const handleEditedTimesheetMock = jest.fn();

        const { rerender } = render(
            <EmployeeTable
                month="2024-08"
                timesheet={timesheet}
                handleEditedTimesheet={handleEditedTimesheetMock}
            />
        );

        expect(sortTimesByDay).toHaveBeenCalledWith(timesheet[0].times);

        const newTimesheet = [
            {
                employee: timesheet[0].employee,
                times: [
                    { day: 1, month: '2024-08', checkIn: '09:00', checkOut: '17:00', balance: 1, isHoliday: false }
                ]
            }
        ];

        rerender(
            <EmployeeTable
                month="2024-08"
                timesheet={newTimesheet}
                handleEditedTimesheet={handleEditedTimesheetMock}
            />
        );

        expect(sortTimesByDay).toHaveBeenCalledWith(newTimesheet[0].times);
    });

    test('renders employee table with correct month, formatted date and sorted timesheet', () => {
        const month = '2024-08';
        const timesheet = [];
        const handleEditedTimesheetMock = jest.fn();

       const { getByTestId } = render(
           <EmployeeTable
               month={month}
               timesheet={timesheet}
               handleEditedTimesheet={handleEditedTimesheetMock}
           />
       );

       const tableContainer = getByTestId(/tables-content/);
       expect(tableContainer).toBeInTheDocument();
    });
});
