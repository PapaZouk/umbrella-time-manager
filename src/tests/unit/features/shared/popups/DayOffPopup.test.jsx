import { render, screen, fireEvent } from '@testing-library/react';
import DayOffPopup from "../../../../../features/shared/popups/DayOffPopup";

describe('DayOffPopup', () => {
    const selectorLabelId = 'day-off-selector-label';
    const selectorSelectId = 'day-off-selector-select';
    const selectorSaveButton = 'day-off-selector-save-button';
    const selectorCancelButton = 'day-off-selector-cancel-button';
    const dayOffErrorId = 'day-off-error';

    const errorMessage = 'Wybierz rodzaj dnia wolnego';

    test('renders day off selector with save and cancel button', () => {
       render(<DayOffPopup onSaveDayOff={() => {}} handleCancel={() => {}}/>);

        const selectorLabel = screen.getByTestId(selectorLabelId);
        const selectorSelect = screen.getByTestId(selectorSelectId);
        const saveButton = screen.getByTestId(selectorSaveButton);
        const cancelButton = screen.getByTestId(selectorCancelButton);

        expect(selectorLabel).toBeInTheDocument();
        expect(selectorLabel.textContent).toBe('Wybierz rodzaj')

        expect(selectorSelect).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(saveButton.textContent).toBe('Zapisz');
        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton.textContent).toBe('Anuluj');
    });

    test('display error message when no day off was selected and save button was clicked', () => {
        render(<DayOffPopup onSaveDayOff={() => {}} handleCancel={() => {}}/>);

        const saveButton = screen.getByTestId(selectorSaveButton);
        fireEvent.click(saveButton);

        const error = screen.getByTestId(dayOffErrorId);

        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe(errorMessage)
    });

    test('calls handle cancel when cancel button was clicked', () => {
        const mockHandleCancel = jest.fn();
        render(<DayOffPopup onSaveDayOff={() => {}} handleCancel={mockHandleCancel}/>);

        const cancelButton = screen.getByTestId(selectorCancelButton);
        fireEvent.click(cancelButton);

        expect(mockHandleCancel).toHaveBeenCalled();
    });

    test('calls on save day off handler when day off was selected and save button was clicked', () => {
        const mockHandleSave = jest.fn();
        render(<DayOffPopup onSaveDayOff={mockHandleSave} handleCancel={() => {}}/>);

        const select = screen.getByTestId(selectorSelectId);
        fireEvent.change(select, { target: { value: "Urlop"}});

        const saveButton = screen.getByTestId(selectorSaveButton);
        fireEvent.click(saveButton);

        expect(mockHandleSave).toHaveBeenCalled();
    });

    test('selecting day and then clicking cancel button should not call on save handler', () => {
        const mockHandleCancel = jest.fn();
        const mockHandleSave = jest.fn();
        render(<DayOffPopup onSaveDayOff={mockHandleSave} handleCancel={mockHandleCancel}/>);

        const select = screen.getByTestId(selectorSelectId);
        fireEvent.change(select, { target: { value: "Urlop macierzyński"}});

        const cancelButton = screen.getByTestId(selectorCancelButton);
        fireEvent.click(cancelButton);

        expect(mockHandleSave).not.toHaveBeenCalled();
        expect(mockHandleCancel).toHaveBeenCalled();
    });
});
