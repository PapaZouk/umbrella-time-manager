import { render, screen, fireEvent } from '@testing-library/react';
import { MonthSelector } from '../../../../src/features/business';
import {DateSelectionContext} from "../../../../../store/date-selection-context";

describe('MonthSelector', () => {
    test('given isMonthSelectionDisabled is set on true should render disabled input', () => {
        const dateSelectionContextValueMock = {
            isMonthSelectionDisabled: true,
            updateMonth: jest.fn(),
        };

        render(
            <DateSelectionContext.Provider value={dateSelectionContextValueMock}>
                <MonthSelector />
            </DateSelectionContext.Provider>
        );

        const inputElement = screen.getByLabelText(/Wybierz miesiąc:/i);

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toBeDisabled();
    });

    test('does not call updateMonth when input is disabled', () => {
        const dateSelectionContextValueMock = {
            isMonthSelectionDisabled: true,
            updateMonth: jest.fn(),
        };
        render(
            <DateSelectionContext.Provider value={dateSelectionContextValueMock}>
                <MonthSelector />
            </DateSelectionContext.Provider>
        );

        const inputElement = screen.getByLabelText(/Wybierz miesiąc:/i);

        fireEvent.focus(inputElement);
        expect(inputElement).toBeDisabled();

        fireEvent.change(inputElement, { target: { value: '2024-01' } });

        expect(dateSelectionContextValueMock.updateMonth).not.toHaveBeenCalled();
    });

    test('given isMonthSelectionDisabled is set on false should render disabled input', () => {
        const dateSelectionContextValueMock = {
            isMonthSelectionDisabled: false,
            updateMonth: jest.fn(),
        };
        render(
            <DateSelectionContext.Provider value={dateSelectionContextValueMock}>
                <MonthSelector />
            </DateSelectionContext.Provider>
        );

        const inputElement = screen.getByTestId('month-selector-label');

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).not.toBeDisabled();
    });

    test('calls updateMonth when input is not disabled and is selected', () => {
        const dateSelectionContextValueMock = {
            isMonthSelectionDisabled: false,
            updateMonth: jest.fn(),
        };
        render(
            <DateSelectionContext.Provider value={dateSelectionContextValueMock}>
                <MonthSelector />
            </DateSelectionContext.Provider>
        );

        const inputElement = screen.getByLabelText(/Wybierz miesiąc:/i);

        fireEvent.change(inputElement, { target: { value: '2024-01' } });

        expect(dateSelectionContextValueMock.updateMonth).toHaveBeenCalledWith('2024-01');
    });
});
