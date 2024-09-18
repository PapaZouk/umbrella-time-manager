import {fireEvent, render} from '@testing-library/react';
import TableInput from "../../../../../../src/features/ui/table/elements/TableInput";

describe('TableInput', () => {
    test('renders input with proper type, value and onChange handler', () => {
        const handler = jest.fn();

        const { container } = render(<TableInput editedValue={'some value'} handler={handler} />);

        const input = container.querySelector('input');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'time');
        expect(input).toHaveAttribute('value', 'some value');
    });

    test('calls the handler when the input value change', () => {
        const editedValue = '12:00';
        const newValue = '13:00';
        const handler = jest.fn();

        const { container } = render(<TableInput editedValue={editedValue} handler={handler} />);

        const input = container.querySelector('input');
        fireEvent.change(input, { target: { value: newValue}});

        expect(input).toBeInTheDocument();
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
