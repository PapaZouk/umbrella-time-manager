import { render, screen } from '@testing-library/react';
import Header from '../../../../../src/features/ui/header/Header';

describe('Header', () => {
    test('should render the logo image and alt text', () => {
        render(<Header />);

        const logoImage = screen.getByTestId('header-logo');


        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('alt', 'Umbrella Time Manager Logo');
    });

    test('should render the title correctly', () => {
        render(<Header />);

        const titleElement = screen.getByTestId('header-title');

        expect(titleElement).toBeInTheDocument();
        expect(titleElement.textContent).toBe('Umbrella Time Manager');
    });

    test('should render the subtitle correctly', () => {
        render(<Header />);

        const subtitleElement = screen.getByTestId('header-subtitle');

        expect(subtitleElement).toBeInTheDocument();
        expect(subtitleElement.textContent).toBe('Twój podręczny menadżer godzin');
    });
});
