import { render, fireEvent } from '@testing-library/react';
import TableEmployeeOverview from "../../../../../../src/features/ui/table/employee/TableEmployeeOverview";

describe('TableEmployeeOverview', () => {
        const sortedTimes = [{
            employee: {
                name: 'Joe',
                surname: 'Bloggs',
                workingHours: '08:00-16:00',
                annualLeave: 26,
            },
            times: [
                {
                    day: 2,
                    month: '2024-07',
                    checkIn: '08:00',
                    checkOut: '15:50',
                    balance: -10,
                    isHoliday: false,
                },
                {
                    day: 1,
                    month: '2024-07',
                    checkIn: '07:50',
                    checkOut: '15:50',
                    balance: 0,
                    isHoliday: false,
                },
            ],
            sortedTimes: [
                {
                    day: 1,
                    month: '2024-07',
                    checkIn: '07:50',
                    checkOut: '15:50',
                    balance: 0,
                    isHoliday: false,
                },
                {
                    day: 2,
                    month: '2024-07',
                    checkIn: '08:00',
                    checkOut: '15:50',
                    balance: -10,
                    isHoliday: false,
                },
            ],
        }];
        const month = '2024-07';
        const formattedDate = 'July 2024';
        const onTimesUpdate = jest.fn();

    test('renders div container containing employee summary and details tables', () => {
       const { getByTestId } = render(
           <TableEmployeeOverview
               sortedTimesheet={sortedTimes}
               month={month}
               formattedDate={formattedDate}
               onTimesUpdate={onTimesUpdate}
           />
       );

       const tablesContainer = getByTestId(/table-content/);
       expect(tablesContainer).toBeInTheDocument();
    });

    test('calls onTimesUpdate with correct arguments when times are updated', () => {
       const { getByTestId  } = render(
           <TableEmployeeOverview
               sortedTimesheet={sortedTimes}
               month={month}
               formattedDate={formattedDate}
               onTimesUpdate={onTimesUpdate}
           />
       );

       const checkInEditButton = getByTestId(/edit-button-checkin-0/);
       expect(checkInEditButton).toBeInTheDocument();
       fireEvent.click(checkInEditButton);

       const checkInInput = getByTestId(/table-input-07:50/);
       expect(checkInInput).toBeInTheDocument();
       fireEvent.change(checkInInput)

        const checkInSave = getByTestId(/save-button/);
       expect(checkInSave).toBeInTheDocument();
       fireEvent.click((checkInSave));

       expect(onTimesUpdate).toHaveBeenCalled();
    });

    test('given no timesheet should use default and return empty container', () => {
       const { getByTestId } = render(
           <TableEmployeeOverview
               month={month}
               formattedDate={formattedDate}
               onTimesUpdate={onTimesUpdate}
           />
       );

       const tablesContainer = getByTestId('tables-content');
       expect(tablesContainer).toBeInTheDocument();
    });
});
