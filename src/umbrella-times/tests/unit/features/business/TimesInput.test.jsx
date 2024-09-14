import { render, screen, fireEvent } from '@testing-library/react';
import TimesInputs from "../../../../src/features/business/TimesInputs";

describe('TimesInput', () => {
    const checkInLabelId = 'time-selector-check-in-label';
    const checkInInputId = 'time-selector-check-in-input';
    const checkOutLabelId = 'time-selector-check-out-label';
    const checkOutInputId = 'time-selector-check-out-input';
    const saveButtonId = 'times-input-save-button';
    const cancelButtonId = 'times-input-cancel-button';

    const inputErrorId = 'times-input-error';
    const errorMessage = 'Uzupełnij wszystkie godziny';

   test('renders times input labels and inputs with save and cancel button', () => {
       render(<TimesInputs handleCloseTimesInputs={() => {}} handleCancel={() => {}}/>)

       const checkInLabel = screen.getByTestId(checkInLabelId);
       const checkInInput = screen.getByTestId(checkInInputId);
       const checkOutLabel = screen.getByTestId(checkOutLabelId);
       const checkOutInput = screen.getByTestId(checkOutInputId);
       const saveButton = screen.getByTestId(saveButtonId);
       const cancelButton = screen.getByTestId(cancelButtonId);

       expect(checkInLabel).toBeInTheDocument();
       expect(checkInInput).toBeInTheDocument();
       expect(checkOutLabel).toBeInTheDocument();
       expect(checkOutInput).toBeInTheDocument();
       expect(saveButton).toBeInTheDocument();
       expect(cancelButton).toBeInTheDocument();
   });

   test('display error message when no check-in and check-out values were provided and save button was clicked', () => {
       render(<TimesInputs handleCloseTimesInputs={() => {}} handleCancel={() => {}}/>)

       const saveButton = screen.getByTestId(saveButtonId);
       fireEvent.click(saveButton);

       const error = screen.getByTestId(inputErrorId);

       expect(error).toBeInTheDocument();
       expect(error.textContent).toBe(errorMessage);
   });

   test('display error message when check-in but no check-out value was provided and save button was clicked', () => {
       render(<TimesInputs handleCloseTimesInputs={() => {}} handleCancel={() => {}}/>)

       const checkInInput = screen.getByTestId(checkInInputId);
       fireEvent.change(checkInInput, { target: { value: '08:20' } });

       const saveButton = screen.getByTestId(saveButtonId);
       fireEvent.click(saveButton);

       const error = screen.getByTestId(inputErrorId);

       expect(error).toBeInTheDocument();
       expect(error.textContent).toBe(errorMessage);
   });

   test('display error message when check-out but no check-it value was provided and save button was clicked', () => {
       render(<TimesInputs handleCloseTimesInputs={() => {}} handleCancel={() => {}}/>)

       const checkOutInput = screen.getByTestId(checkOutInputId);
       fireEvent.change(checkOutInput, { target: { value: '16:00' } });

       const saveButton = screen.getByTestId(saveButtonId);
       fireEvent.click(saveButton);

       const error = screen.getByTestId(inputErrorId);

       expect(error).toBeInTheDocument();
       expect(error.textContent).toBe(errorMessage);
   });

   test('calls handleCloseTimesInputs when both check-in and check-out values are provided and save button was clicked', () => {
       const mockHandleSave = jest.fn();
       render(<TimesInputs handleCloseTimesInputs={mockHandleSave} handleCancel={() => {}}/>)

       const checkInInput = screen.getByTestId(checkInInputId);
       fireEvent.change(checkInInput, { target: { value: '08:20' } });

       const checkOutInput = screen.getByTestId(checkOutInputId);
       fireEvent.change(checkOutInput, { target: { value: '16:00' } });

       const saveButton = screen.getByTestId(saveButtonId);
       fireEvent.click(saveButton);

       expect(mockHandleSave).toHaveBeenCalled();
   });

   test('calls handleCancel when cancel button was clicked', () => {
       const mockHandleCancel = jest.fn();
       render(<TimesInputs handleCloseTimesInputs={() => {}} handleCancel={mockHandleCancel}/>)

       const cancelButton = screen.getByTestId(cancelButtonId);
       fireEvent.click(cancelButton);

       expect(mockHandleCancel).toHaveBeenCalled();
   });

    test('when check-in and check-out were filled and cancel button was clicked, should not call handleCloseTimesInputs', () => {
        const mockHandleSave = jest.fn();
        const mockHandleCancel = jest.fn();
        render(<TimesInputs handleCloseTimesInputs={mockHandleSave} handleCancel={mockHandleCancel}/>)

        const checkInInput = screen.getByTestId(checkInInputId);
        fireEvent.change(checkInInput, { target: { value: '08:20' } });

        const checkOutInput = screen.getByTestId(checkOutInputId);
        fireEvent.change(checkOutInput, { target: { value: '16:00' } });

        const cancelButton = screen.getByTestId(cancelButtonId);
        fireEvent.click(cancelButton);

        expect(mockHandleCancel).toHaveBeenCalled();
        expect(mockHandleSave).not.toHaveBeenCalled();
    });
});
