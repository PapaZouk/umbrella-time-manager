import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../../../../src/components/messages'
import '../../../../src/icons/Icons'
import {MessagesContext} from "../../../../../store/messages-context";

jest.mock('../../../../src/icons/Icons', () => ({
    ErrorIcon: jest.fn(() => <div data-testid="mock-error-icon"/>)
}))

describe('ErrorMessage', () => {
    test('renders the error message and error icon when provided', () => {
        const message = 'test message';

        const messageContextValueMock = {
            errorMessage: message,
        };

        render(
            <MessagesContext.Provider value={messageContextValueMock}>
                <ErrorMessage />
            </MessagesContext.Provider>
        );

        expect(screen.getByText(message)).toBeInTheDocument();
        expect(screen.getByTestId("mock-error-icon")).toBeInTheDocument();
    });

    test('no message was provided, should not render error', () => {
        render(
            <MessagesContext.Provider value={{ errorMessage: null }} >
                <ErrorMessage />
            </MessagesContext.Provider>
        );

        const errorMessagePopup = screen.queryByTestId('error-message-popup');
        const errorFrame = screen.queryByTestId('errors.errorFrame');

        expect(errorMessagePopup).not.toBeInTheDocument();
        expect(errorFrame).not.toBeInTheDocument();
    });
});
