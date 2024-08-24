import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { SaveTimesheet } from '../../../../components/business/SaveTimesheet';
import { ErrorMessage, SuccessMessage } from '../../../../components/utils';
import validateTimesheets from '../../../../validators/validateTimesheets.js';

jest.mock('../../../../validators/validateTimesheets');
jest.mock('../../../../components/utils', () => ({
    SuccessMessage: jest.fn(({ message }) => <div>{message}</div>),
    ErrorMessage: jest.fn(({ message }) => <div>{message}</div>),
}));

describe('SaveTimesheet', () => {
    const onSaveMock = jest.fn();

    const timeSheets = [{
        employee: {
            name: 'Joe',
            surname: 'Bloggs',
            workingHours: '08:00-16:00',
        },
        times: [{
            checkIn: '08:10',
            checkOut: '15:55',
            month: '2024-08',
            day: '1',
            balance: -15,
            isHoliday: false,
        }],
    }];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the save button', () => {
        render(<SaveTimesheet timesheets={timeSheets} onSave={onSaveMock} />);

        const saveButton = screen.getByText('Zapisz godziny');

        expect(saveButton).toBeInTheDocument();
    });

    test('calls onSave and shows success message when timesheets are not empty', () => {
        render(<SaveTimesheet timesheets={timeSheets} onSave={onSaveMock} />);

        const saveButton = screen.getByText('Zapisz godziny');

        fireEvent.click(saveButton);
        const successMessage = screen.getByText('Pomyślnie zapisano godziny.');

        expect(onSaveMock).toHaveBeenCalled();
        expect(successMessage).toBeInTheDocument();
        expect(validateTimesheets).toHaveBeenCalledWith(timeSheets);
    });

    test('given timesheets are empty should not call on save and show error message', () => {
        render(<SaveTimesheet timesheets={[]} onSave={onSaveMock} />);

        const saveButton = screen.getByText('Zapisz godziny');

        fireEvent.click(saveButton);
        const errorMessage = screen.getByText('Brak godzin do zapisu. Dodaj godziny.');

        expect(onSaveMock).not.toHaveBeenCalled();
        expect(errorMessage).toBeInTheDocument();
        expect(validateTimesheets).not.toHaveBeenCalled();
    });
});