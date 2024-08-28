import {fireEvent, render} from '@testing-library/react';
import TableDetails from "../../../../../../features/ui/table/details/TableDetails";
import {calculateBalance} from "../../../../../../features/utils";

const styles = {
    "total-balance-cell": "total-balance-cell",
    "total-balance-negative": "total-balance-negative",
    "total-balance-positive": "total-balance-positive",
};

jest.mock('../../../../../../features/ui/table/styles/Tables.module.css', () => ({
    styles
}));
jest.mock('../../../../../../features/utils/calculators/calculateBalance', () => ({
    calculateBalance: jest.fn(() => 0),
}));

describe('TableDetails', () => {
    const onTimesUpdateMock = jest.fn();

    let sortedTimes;

    beforeEach(() => {
        sortedTimes = [
            {
                day: '1',
                month: '2024-08',
                checkIn: '08:00',
                checkOut: '16:00',
                balance: 0,
                isHoliday: false,
            }
        ];
    });

   test('renders table wit all table elements correctly', () => {
     const { container } = render(
         <TableDetails
             sortedTimes={sortedTimes}
             onTimesUpdate={onTimesUpdateMock}
         />
     );

     const table = container.querySelector('table');
     const thead = table.querySelector('thead');
     const tbody = table.querySelector('tbody');

     expect(table).toBeInTheDocument();
     expect(thead).toBeInTheDocument();
     expect(tbody).toBeInTheDocument();
   });

   test('renders annual leave row when isHoliday is set true', () => {
       sortedTimes[0].isHoliday = true;

       const { container } = render(
           <TableDetails
               sortedTimes={sortedTimes}
               onTimesUpdate={onTimesUpdateMock}
           />
       );

       const tbody = container.querySelector('tbody');
       const row = tbody.firstChild;
       const balanceCell = row.childNodes[1];

       expect(row).toBeInTheDocument();
       expect(balanceCell.textContent).toBe('URLOP');
   });

   test('renders times check in and check out inputs with edit buttons when isHoliday is set to false', () => {
       const { container } = render(
           <TableDetails
               sortedTimes={sortedTimes}
               onTimesUpdate={onTimesUpdateMock}
           />
       );

       const tbody = container.querySelector('tbody');
       const row = tbody.querySelector('tr');
       const dayCell = row.firstChild;
       const checkInCell = row.childNodes[1];
       const checkOutCell = row.childNodes[2];
       const totalBalanceCell = row.childNodes[3];

       const checkInInput = checkInCell.firstChild;
       const checkOutInput = checkOutCell.firstChild;

       expect(tbody).toBeInTheDocument();
       expect(row).toBeInTheDocument();
       expect(dayCell).toBeInTheDocument();
       expect(dayCell.textContent).toBe(sortedTimes[0].day);

       expect(checkInCell).toBeInTheDocument();
       expect(checkOutCell).toBeInTheDocument();
       expect(totalBalanceCell).toBeInTheDocument();

       expect(checkInInput.textContent).toBe(sortedTimes[0].checkIn);
       expect(checkOutInput.textContent).toBe(sortedTimes[0].checkOut);
   });

   test('handleEditClick sets editing state correctly when clicking edit button for checkIn', () => {
      const { getByTestId, getByDisplayValue} = render(
          <TableDetails
              sortedTimes={sortedTimes}
              onTimesUpdate={onTimesUpdateMock}
          />
      );

      const editButton = getByTestId('edit-button-checkin-0');
      fireEvent.click(editButton);

      const input = getByDisplayValue('08:00');
      expect(input).toBeInTheDocument();
   });

   test('handleEditClick sets editing state correctly when clicking edit button for checkOut', () => {
      const { getByTestId, getByDisplayValue} = render(
          <TableDetails
              sortedTimes={sortedTimes}
              onTimesUpdate={onTimesUpdateMock}
          />
      );

      const editButton = getByTestId('edit-button-checkout-0');
      fireEvent.click(editButton);

      const input = getByDisplayValue('16:00');
      expect(input).toBeInTheDocument();

      fireEvent.change(input, { target: { value: '16:30' } });
      const checkOutInput = getByDisplayValue('16:30');
      expect(checkOutInput).toBeInTheDocument();
   });

    test('handleSave updates the time and calls onTimesUpdate', () => {
        const expectedUpdatedTimes = [{
            day: sortedTimes[0].day,
            month: sortedTimes[0].month,
            checkIn: '09:30',
            checkOut: sortedTimes[0].checkOut,
            balance: sortedTimes[0].balance,
            isHoliday: sortedTimes[0].isHoliday,
        }];
        const {getByTestId, getByDisplayValue} = render(
            <TableDetails
                sortedTimes={sortedTimes}
                onTimesUpdate={onTimesUpdateMock}
            />
        );

        fireEvent.click(getByTestId('edit-button-checkin-0'));
        fireEvent.change(getByDisplayValue('08:00'), { target: { value: '09:30'}});
        fireEvent.click(getByTestId('save-button'));

        expect(onTimesUpdateMock).toHaveBeenCalledWith(expectedUpdatedTimes);
        expect(calculateBalance).toHaveBeenCalledWith('09:30', '16:00', 8);
    });

    test('handleCancel resets the editing state without calling onTimesUpdate', () => {
        const { getByTestId, getByDisplayValue } = render(
            <TableDetails
                sortedTimes={sortedTimes}
                onTimesUpdate={onTimesUpdateMock}
            />
        );

        fireEvent.click(getByTestId('edit-button-checkout-0'));

        const checkOutInput = getByDisplayValue('16:00');
        fireEvent.change(checkOutInput, { target: { value: '16:30' }});

        fireEvent.click(getByTestId('cancel-button'));

        expect(checkOutInput).not.toBeInTheDocument();
        expect(getByTestId('edit-button-checkout-0')).toBeInTheDocument();
    });


    test('handles empty sortedTimes array gracefully', () => {
        sortedTimes = [];

        const { getByTestId } = render(<TableDetails sortedTimes={sortedTimes} onTimesUpdate={onTimesUpdateMock} />);

        expect(getByTestId('table-details').querySelector('tbody').children).toHaveLength(0);
    });

    test('handleSave updates time and balance correctly and calls onTimesUpdate', () => {
        calculateBalance.mockReturnValueOnce(1);

        const { getByTestId , getByDisplayValue} = render(<TableDetails sortedTimes={sortedTimes} onTimesUpdate={onTimesUpdateMock} />);

        fireEvent.click(getByTestId('edit-button-checkin-0'));
        // Change the check-in time
        fireEvent.change(getByDisplayValue('08:00'), { target: { value: '09:00' } });
        // Click the save button
        fireEvent.click(getByTestId('save-button'));

        const expectedUpdatedTimes = [{
            day: '1',
            month: '2024-08',
            checkIn: '09:00',
            checkOut: '16:00',
            balance: 1,
            isHoliday: false,
        }];

        expect(onTimesUpdateMock).toHaveBeenCalledWith(expectedUpdatedTimes);
        expect(calculateBalance).toHaveBeenCalledWith('09:00', '16:00', 8);
    });
});
