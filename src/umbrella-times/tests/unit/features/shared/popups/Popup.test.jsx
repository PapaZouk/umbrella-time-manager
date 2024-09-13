import { render, screen } from '@testing-library/react';
import Popup from "../../../../../features/shared/popups/Popup";

describe('Popup', () => {
    test('renders content correctly', () => {
        render(<Popup content={<div>Test Content</div>} />);

        const popupElement = screen.getByTestId('popup-element');
        const popupContent = screen.getByTestId('popup-content');

        expect(popupElement).toBeInTheDocument();
        expect(popupContent).toBeInTheDocument();
        expect(popupContent).toHaveTextContent('Test Content');
    });

    test('renders nothing when no content is provided', () => {
        const { container } = render(<Popup content={null} />);

        expect(container.firstChild).toBeNull();
    });
});
