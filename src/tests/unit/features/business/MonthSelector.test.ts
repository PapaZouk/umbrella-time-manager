import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { MonthSelector } from "../../../../features/business/MonthSelector";

describe('MonthSelector', () => {
    const onMonthChangeMock = jest.fn();

    beforeEach(() => {
        onMonthChangeMock.mockClear();
    });

    test('given disabled is set on true should render disabled input', () => {
        render(<MonthSelector onMonthChange={ onMonthChangeMock } disabled = { true } />);

        const inputElement = screen.getByLabelText(/Wybierz miesiąc:/i);

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toBeDisabled();
    });

    test('does not call onMonthChange when input is disabled', () => {
        render(<MonthSelector onMonthChange={ onMonthChangeMock } disabled={ true } />);

        const inputElement = screen.getByLabelText(/Wybierz miesiąc:/i);

        fireEvent.focus(inputElement);
        expect(inputElement).toBeDisabled();

        fireEvent.change(inputElement, { target: { value: '2024-01' } });

        expect(onMonthChangeMock).not.toHaveBeenCalled();
    });

    test('given disabled is set on false should render disabled input', () => {
        render(<MonthSelector onMonthChange={ onMonthChangeMock } disabled = { false } />);

        const inputElement = screen.getByLabelText(/Wybierz miesiąc:/i);

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).not.toBeDisabled();
    });

    test('calls onMonthChange when input is not disabled and is selected', () => {
        render(<MonthSelector onMonthChange={ onMonthChangeMock } disabled = { false } />);

        const inputElement = screen.getByLabelText(/Wybierz miesiąc:/i);

        fireEvent.change(inputElement, { target: { value: '2024-01' } });

        expect(onMonthChangeMock).toHaveBeenCalledWith('2024-01');
    });
});
