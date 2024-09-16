import { render, screen } from '@testing-library/react';
import { SuccessMessage } from '../../../../src/components/messages';
import {MessagesContext} from "../../../../../store/messages-context";

jest.mock('../../../../src/icons/Icons', () => ({
  SuccessIcon: () => <div data-testid="success-icon"></div>
}));

describe('SuccessMessage', () => {
  test('renders the success message when successMessage is provided', () => {
    const mockContextValue = { successMessage: "Successful" };

    render(
        <MessagesContext.Provider value={mockContextValue}>
          <SuccessMessage />
        </MessagesContext.Provider>
    );

    expect(screen.getByTestId('success-message-popup')).toBeInTheDocument();
    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    expect(screen.getByTestId('success-message-popup').textContent).toBe('Successful');
  });

  test('does not render when no message is provided', () => {
    const mockContextValue = { successMessage: ''};
    render(
        <MessagesContext.Provider value={mockContextValue}>
          <SuccessMessage />
        </MessagesContext.Provider>
    );

    expect(screen.queryByTestId('success-message-popup')).toBeNull();
  });
});
