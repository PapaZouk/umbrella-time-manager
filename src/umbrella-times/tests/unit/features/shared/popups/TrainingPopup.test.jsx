import { render, screen, fireEvent} from '@testing-library/react';
import TrainingPopup from "../../../../../src/features/shared/popups/TrainingPopup";

describe('trainingPopup', () => {
    const trainingSelectorLabelId = 'training-selector-label';
    const trainigSelectorId = 'training-selector';
    const trainingSelectorSaveButtonId = 'training-selector-save-button';
    const trainingSelectorCancelButtonId = 'training-selector-cancel-button';
    const trainingPopupErrorId = 'training-popup-error';

    const errorMessage = 'Wybierz rodzaj szkolenia';

    test('renders label with selector, save and cancel button correctly', () => {
        render(
           <TrainingPopup
               onSaveTraining={() => {}}
               handleCancel={() => {}}
           />
       );

       const trainingLabel = screen.getByTestId(trainingSelectorLabelId);
       const trainingSelector = screen.getByTestId(trainigSelectorId);
       const trainingSaveButton = screen.getByTestId(trainingSelectorSaveButtonId);
       const trainingCancelButton = screen.getByTestId(trainingSelectorCancelButtonId);

       expect(trainingLabel).toBeInTheDocument();
       expect(trainingSelector).toBeInTheDocument();
       expect(trainingSaveButton).toBeInTheDocument();
       expect(trainingCancelButton).toBeInTheDocument();
    });

    test('display error message when no training was selected and save button was clicked', () => {
        const onSaveTrainingMock = jest.fn();

        render(
           <TrainingPopup
            onSaveTraining={onSaveTrainingMock}
            handleCancel={() => {}}
           />
       );

       const trainingSaveButton = screen.getByTestId(trainingSelectorSaveButtonId);
       fireEvent.click(trainingSaveButton);

       const error = screen.getByTestId(trainingPopupErrorId);

       expect(error).toBeVisible();
       expect(error.textContent).toBe(errorMessage);
    });

    test('calls handle cancel when cancel button was clicked', () => {
        const handleCancelMock = jest.fn();

        render(
           <TrainingPopup
            onSaveTraining={() => {}}
            handleCancel={handleCancelMock}
           />
       );

       const trainingCancelButton = screen.getByTestId(trainingSelectorCancelButtonId);
       fireEvent.click(trainingCancelButton);

       expect(handleCancelMock).toHaveBeenCalled();
    });

    test('calls onSaveTraining when training was selected and save button was clicked', () => {
        const onSaveTrainingMock = jest.fn();

        render(
            <TrainingPopup
                onSaveTraining={onSaveTrainingMock}
                handleCancel={() => {}}
            />
        );

        const select = screen.getByTestId(trainigSelectorId);
        fireEvent.change(select, { target: { value: 'BHP' } });

        const saveButton = screen.getByTestId(trainingSelectorSaveButtonId);
        fireEvent.click(saveButton);

        expect(onSaveTrainingMock).toHaveBeenCalled();
    });

    test('selecting training and then clicking cancel button should not call onSaveTraining', () => {
        const onSaveTrainingMock = jest.fn();
        const handleCancelMock = jest.fn();

        render(
           <TrainingPopup
            onSaveTraining={onSaveTrainingMock}
            handleCancel={handleCancelMock}
           />
       );

       const select = screen.getByTestId(trainigSelectorId);
       fireEvent.change(select, { target: { value: 'BHP' } });

       const cancelButton = screen.getByTestId(trainingSelectorCancelButtonId);
       fireEvent.click(cancelButton);

       expect(onSaveTrainingMock).not.toHaveBeenCalled();
       expect(handleCancelMock).toHaveBeenCalled();
    });
});
