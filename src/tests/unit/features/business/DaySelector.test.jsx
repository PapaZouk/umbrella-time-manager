import { render, screen, fireEvent } from '@testing-library/react';
import { DaySelector } from '../../../../features/business';

describe('DaySelector', () => {
    const onDayChangeMock = jest.fn();
    const days = [1, 2, 3, 4];

    test('render correctly with given days', () => {
        render(<DaySelector days={days} onDayChange={onDayChangeMock} />);

        expect(screen.getByLabelText(/Wybierz dzień:/i)).toBeInTheDocument();
        expect(screen.getByText('Wybierz...')).toBeInTheDocument();
        expect(screen.getAllByRole('option').length).toBe(days.length + 1);

        days.forEach((day) => {
            expect(screen.getByText(day)).toBeInTheDocument();
        })
    });

    test('calls onDayChange when a day is selected', () => {
        render(<DaySelector days={ days } onDayChange = { onDayChangeMock } />);

        fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

        expect(onDayChangeMock).toHaveBeenCalledWith('1');
    });

    test('renders without errors when days is undefined or empty', () => {
        render(<DaySelector days={ [] } onDayChange = { onDayChangeMock } />);

        expect(screen.getByText('Wybierz...')).toBeInTheDocument();
        expect(screen.getAllByRole('option').length).toBe(1);
    });
});
