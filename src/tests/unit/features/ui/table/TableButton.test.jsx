import { render, screen } from '@testing-library/react';
import TableButton from "../../../../../features/ui/table/TableButton";

describe('TableButton', () => {
    test('renders table button correctly', () => {
        const onClickHandlerMock = jest.fn();
        const icon = <p>Some Icon</p>;

       render(<TableButton onClickHandler={onClickHandlerMock} icon={icon}/>);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
