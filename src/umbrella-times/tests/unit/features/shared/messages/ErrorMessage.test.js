import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../../../../../features/shared'
import '../../../../../features/ui/icons/Icons'

jest.mock('../../../../../features/ui/icons/Icons', () => ({
    ErrorIcon: jest.fn(() => <div data-testid="mock-error-icon"/>)
}))

describe('ErrorMessage', () => {
    test('renders the error message and error icon when provided', () => {
        const message = 'test message';

        render(<ErrorMessage message={message} />);

        expect(screen.getByText(message)).toBeInTheDocument();
        expect(screen.getByTestId("mock-error-icon")).toBeInTheDocument();
    });

    test('no message was provided, should not render error', () => {
        render(<ErrorMessage message={null} />);

        expect(screen.queryByText(/./)).toBeNull();
    });
});
