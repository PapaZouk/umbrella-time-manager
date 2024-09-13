import {render} from '@testing-library/react';
import {Container} from "../../../../../features/shared";

jest.mock('../../../../../features/shared/styles/Container.module.css', () => ({
    container: 'container-style',
    containerAppear: 'container-appear-style'
}));

describe('Container', () => {
    test('renders container with fadeIn style correctly', () => {
        const { container } = render(<Container fadeIn={true}>Test Content</Container>);

        expect(container.firstChild).toHaveClass('container-style container-appear-style');
    });

    test('renders children correctly', () => {
       const { getByText } = render(<Container>Test Content</Container>);

       expect(getByText('Test Content')).toBeInTheDocument();
    });

    test('does not apply container-appear class when fadeIn is false', () => {
       const { container } = render(<Container fadeIn={false}>Test Content</Container>)

        expect(container.firstChild).not.toHaveClass('containerAppear');
    });
});
