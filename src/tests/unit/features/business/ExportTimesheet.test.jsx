import { render, fireEvent } from '@testing-library/react';
import {ExportTimesheet} from "../../../../features/business";
import * as XLSX from 'xlsx';

jest.mock('xlsx', () => ({
    utils: {
        table_to_sheet: jest.fn(),
        book_new: jest.fn(),
        book_append_sheet: jest.fn(),
    },
    writeFile: jest.fn(),
}));

describe('ExportTimesheet', () => {
       const onErrorMock = jest.fn();

       beforeEach(() => {
          jest.useFakeTimers();
       });

       afterEach(() => {
           jest.clearAllTimers();
           jest.useRealTimers();
       })

    test('calls onError when timesheet is empty', () => {
       const emptyTimesheet = [];

       const { getByText } = render(<ExportTimesheet timesheet={emptyTimesheet} onError={onErrorMock} />);

        const exportButton = getByText('Exportuj');
        fireEvent.click(exportButton);

        expect(onErrorMock).toHaveBeenCalledWith('Brak godzin do exportowania');

        jest.advanceTimersByTime(2000);
        jest.runAllTimers();

        expect(onErrorMock).toHaveBeenCalledWith('');
    });

    test('calls XLSX when timesheet is not empty', () => {
        const validTimesheet = [
            {
                day: 1,
                month: '2024-08',
                checkIn: '08:00',
                checkOut: '16:00',
                balance: 0,
                isHoliday: false,
            }
        ];

        const { getByText } = render(<ExportTimesheet timesheet={validTimesheet} onError={onErrorMock} />);

        const exportButton = getByText('Exportuj');
        fireEvent.click(exportButton);

        expect(XLSX.utils.table_to_sheet).toHaveBeenCalled();
        expect(XLSX.utils.book_new).toHaveBeenCalled();
        expect(XLSX.utils.book_append_sheet).toHaveBeenCalled();
        expect(XLSX.writeFile).toHaveBeenCalled();
    })
});
