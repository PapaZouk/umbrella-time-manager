import {render} from '@testing-library/react';
import {Container} from "../../../../../umbrella-times/src/features/shared";

jest.mock('../../../../../umbrella-web-common/src/components/styles/Container.module.css', () => ({
    container: 'container-style',
    containerAppear: 'container-appear-style'
}));

describe('Container', () => {
    test('renders container with fadeIn and default style correctly', () => {
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
