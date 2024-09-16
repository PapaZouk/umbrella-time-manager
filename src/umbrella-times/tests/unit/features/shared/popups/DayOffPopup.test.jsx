import { render, screen, fireEvent } from '@testing-library/react';
import DayOffPopup from "../../../../../src/features/shared/popups/DayOffPopup";
import {PopupContext} from "../../../../../../store/popups-context";
import {MessagesContext} from "../../../../../../store/messages-context";

describe('DayOffPopup', () => {
    const selectorLabelId = 'day-off-selector-label';
    const selectorSelectId = 'day-off-selector-select';
    const selectorSaveButton = 'day-off-selector-save-button';
    const selectorCancelButton = 'day-off-selector-cancel-button';
    const dayOffErrorId = 'day-off-error';

    const errorMessage = 'Wybierz rodzaj dnia wolnego';

    const popupContextValueMock = {
        closePopup: jest.fn(),
    };

    test('renders day off selector with save and cancel button', () => {
        const messageContextValueMock = {
            errorMessage: '',
            setErrorMessage: jest.fn(),
        };
       render(
           <PopupContext.Provider value={popupContextValueMock}>
               <MessagesContext.Provider value={messageContextValueMock}>
                   <DayOffPopup onSaveDayOff={() => {}}/>
               </MessagesContext.Provider>
           </PopupContext.Provider>
       );

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
        const messageContextValueMock = {
            errorMessage: errorMessage,
            setErrorMessage: jest.fn(),
        };
        render(
            <PopupContext.Provider value={popupContextValueMock}>
                <MessagesContext.Provider value={messageContextValueMock}>
                    <DayOffPopup onSaveDayOff={() => {}}/>
                </MessagesContext.Provider>
            </PopupContext.Provider>
        );

        const saveButton = screen.getByTestId(selectorSaveButton);
        fireEvent.click(saveButton);

        const error = screen.getByTestId(dayOffErrorId);

        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe(errorMessage)
    });

    test('calls closePopup when cancel button was clicked', () => {
        const messageContextValueMock = {
            errorMessage: '',
            setErrorMessage: jest.fn(),
        };

        render(
            <PopupContext.Provider value={popupContextValueMock}>
                <MessagesContext.Provider value={messageContextValueMock}>
                    <DayOffPopup onSaveDayOff={() => {}}/>
                </MessagesContext.Provider>
            </PopupContext.Provider>
        );

        const cancelButton = screen.getByTestId(selectorCancelButton);
        fireEvent.click(cancelButton);

        expect(popupContextValueMock.closePopup).toHaveBeenCalled();
    });

    test('calls on save day off handler when day off was selected and save button was clicked', () => {
        const messageContextValueMock = {
            errorMessage: '',
            setErrorMessage: jest.fn(),
        };
        const mockSaveDayOff = jest.fn();

        render(
            <PopupContext.Provider value={popupContextValueMock}>
                <MessagesContext.Provider value={messageContextValueMock}>
                    <DayOffPopup onSaveDayOff={mockSaveDayOff}/>
                </MessagesContext.Provider>
            </PopupContext.Provider>
        );

        const select = screen.getByTestId(selectorSelectId);
        fireEvent.change(select, { target: { value: "Urlop"}});

        const saveButton = screen.getByTestId(selectorSaveButton);
        fireEvent.click(saveButton);

        expect(mockSaveDayOff).toHaveBeenCalled();
    });

    test('selecting day and then clicking cancel button should not call on save handler', () => {
        const messageContextValueMock = {
            errorMessage: '',
            setErrorMessage: jest.fn(),
        };
        const mockSaveDayOff = jest.fn();

        render(
            <PopupContext.Provider value={popupContextValueMock}>
                <MessagesContext.Provider value={messageContextValueMock}>
                    <DayOffPopup onSaveDayOff={mockSaveDayOff}/>
                </MessagesContext.Provider>
            </PopupContext.Provider>
        );

        const select = screen.getByTestId(selectorSelectId);
        fireEvent.change(select, { target: { value: "Urlop macierzyński"}});

        const cancelButton = screen.getByTestId(selectorCancelButton);
        fireEvent.click(cancelButton);

        expect(mockSaveDayOff).not.toHaveBeenCalled();
        expect(popupContextValueMock.closePopup).toHaveBeenCalled();
    });
});
