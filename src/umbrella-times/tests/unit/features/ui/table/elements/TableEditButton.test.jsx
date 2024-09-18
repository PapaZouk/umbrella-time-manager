import {fireEvent, render} from '@testing-library/react';
import TableEditButton from "../../../../../../src/features/ui/table/elements/TableEditButton";

describe('TableEditButton', () => {
    test('render table button element correctly', () => {
        const handler = jest.fn();

        const { container } = render(<TableEditButton onEditHandler={handler} />);
        const button = container.querySelector('button');

        expect(button).toBeInTheDocument();

        const editIconElement = container.querySelector('svg');
        expect(editIconElement).toBeInTheDocument();
    });

    test('calls onEditHandler when clicked', () => {
       const handler = jest.fn();

       const { container } = render(<TableEditButton onEditHandler={handler} />);
        const button = container.querySelector('button');
        fireEvent.click(button);

       expect(handler).toHaveBeenCalled();
    });
});
