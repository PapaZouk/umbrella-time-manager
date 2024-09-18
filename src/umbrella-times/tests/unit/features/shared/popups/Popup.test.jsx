import {render, screen} from '@testing-library/react';
import Popup from "../../../../../src/features/shared/popups/Popup";
import {PopupContext} from "../../../../../../store/popups-context";

describe('Popup', () => {
    test('renders content correctly', () => {
        render(
            <PopupContext.Provider value={{ popupContent: "test" }}>
                <Popup />
            </PopupContext.Provider>
        );

        const popupElement = screen.getByTestId('popup-element');
        const popupContent = screen.getByTestId('popup-content');

        expect(popupElement).toBeInTheDocument();
        expect(popupContent).toHaveTextContent('test');
    });

    test('renders nothing when no content is provided', () => {
        render(
            <PopupContext.Provider value={{ popupContent: null }}>
                <Popup/>
            </PopupContext.Provider>
        );

        const popupElement = screen.queryByTestId('popup-element');
        const popupContent = screen.queryByTestId('popup-content');

        expect(popupElement).not.toBeInTheDocument();
        expect(popupContent).not.toBeInTheDocument();
    });
});
