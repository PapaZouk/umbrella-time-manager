import { render, screen } from '@testing-library/react';
import TableButton from "../../../../../../src/features/ui/table/elements/TableButton";

describe('TableButton', () => {
    test('renders table button correctly', () => {
        const onClickHandlerMock = jest.fn();
        const icon = <p>Some Icon</p>;

       render(<TableButton onClickHandler={onClickHandlerMock} icon={icon}/>);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
