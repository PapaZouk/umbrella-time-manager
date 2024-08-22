import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../../../../../components/utils'

describe('ErrorMessage', () => {
    test('renders error message when provided', () => {
        const message = 'test message';

        render(<ErrorMessage message={message} />);

        expect(screen.getByText(message)).toBeInTheDocument();
        expect(screen.getByText(message)).toHaveStyle('backgroundColor: #f8d7da');
        expect(screen.getByText(message)).toHaveStyle('color: #721c24');
    });

    test('no message was provided, should not render error', () => {
        render(<ErrorMessage message={null} />);

        expect(screen.queryByText(/./)).toBeNull();
    });
});