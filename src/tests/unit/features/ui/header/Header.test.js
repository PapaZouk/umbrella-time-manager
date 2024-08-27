import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../../../../features/ui/header/Header';

describe('Header', () => {
    test('should render the logo image and alt text', () => {
        render(<Header />);

        const logoImage = screen.getByAltText('Umbrella Time Manager Logo');

        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src');
    });

    test('should render the title correctly', () => {
        render(<Header />);

        const titleElement = screen.getByText('Umbrella Time Manager');

        expect(titleElement).toBeInTheDocument();
    });
});
