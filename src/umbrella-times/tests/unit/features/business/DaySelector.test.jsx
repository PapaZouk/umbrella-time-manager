import { render, screen, fireEvent } from '@testing-library/react';
import { DaySelector } from '../../../../src/features/business';
import {DateSelectionContext} from "../../../../../store/date-selection-context";
import {useMonthDays} from "../../../../src/features/hooks";

const days = [1, 2, 3, 4];

jest.mock('../../../../src/features/hooks', () => ({
    useMonthDays: jest.fn(() => days),
}));

describe('DaySelector', () => {
    const mockDateSelectionContext = {
        selectedMonth: '2024-08',
        selectedDay: '12',
        updateDay: jest.fn(),
    }

    test('render correctly with given days', () => {
        render(
            <DateSelectionContext.Provider value={mockDateSelectionContext}>
                <DaySelector />
            </DateSelectionContext.Provider>
        );

        expect(screen.getByTestId('day-selector-input')).toBeInTheDocument();
        expect(screen.getByTestId('day-selector-input').textContent).toBe('Wybierz dzień:');
        expect(screen.getByTestId('day-selector-select')).toBeInTheDocument();
        expect(screen.getAllByRole('option').length).toBe(days.length + 1);

        days.forEach((day) => {
            expect(screen.getByText(day)).toBeInTheDocument();
        })
    });

    test('calls updateDate when a day is selected', () => {
        render(
            <DateSelectionContext.Provider value={mockDateSelectionContext}>
                <DaySelector />
            </DateSelectionContext.Provider>
        );

        fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

        expect(mockDateSelectionContext.updateDay).toHaveBeenCalledWith('1');
    });

    test('renders without errors when days is undefined or empty', () => {
        useMonthDays.mockReturnValue([]);

        render(
            <DateSelectionContext.Provider value={mockDateSelectionContext}>
                <DaySelector />
            </DateSelectionContext.Provider>
        );

        expect(screen.getByText('Wybierz...')).toBeInTheDocument();
        expect(screen.getAllByRole('option').length).toBe(1);
    });
});
