import React from 'react';
import { render, screen } from '@testing-library/react';
import { SuccessMessage } from '../../../../../features/shared/messages';

describe('SuccessMessage', () => {
  test('renders success message when provided', () => {
    const message = 'test message';

    render(<SuccessMessage message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message)).toHaveStyle('background-color: #d4edda');
    expect(screen.getByText(message)).toHaveStyle('color: #155724');
  });

  test('does not render when no message is provided', () => {
    render(<SuccessMessage message={null} />);
    expect(screen.queryByText(/./)).toBeNull();
  });
});
