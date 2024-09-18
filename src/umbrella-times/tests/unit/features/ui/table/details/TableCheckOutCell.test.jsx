import {render, screen, fireEvent} from '@testing-library/react';
import TableCheckOutCell from "../../../../../../src/features/ui/table/details/TableCheckOutCell";

describe('TableCheckOutCell', () => {
    const time = { checkOut: '15:00' };
    const handleInputChange = jest.fn();
    const handleSave = jest.fn();
    const handleCancel = jest.fn();
    const handleEditClick = jest.fn();

    test('renders td element with edit button when no checkOut editingField is provided', () => {
        const { container } = render(
            <table>
                <tbody>
                <tr>
                    <TableCheckOutCell
                        time={time}
                        editingIndex={2}
                        index={4}
                        editingField={'test'}
                        editedCheckOut={"16:00"}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                        handleEditClick={handleEditClick}
                    />
                </tr>
                </tbody>
            </table>
        );

        const td = container.querySelector('td');
        const checkOutValue = screen.getByText(time.checkOut);

        expect(td).toBeInTheDocument();
        expect(checkOutValue).toBeInTheDocument();
    });

    test('calls handleEditClick when edit button is clicked', () => {
        const { container } = render(
            <table>
                <tbody>
                <tr>
                    <TableCheckOutCell
                        time={time}
                        editingIndex={2}
                        index={4}
                        editingField={'test'}
                        editedCheckOut={"16:00"}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                        handleEditClick={handleEditClick}
                    />
                </tr>
                </tbody>
            </table>
        );

        const editButton = container.querySelector('button');
        expect(editButton).toBeInTheDocument();

        fireEvent.click(editButton);

        expect(handleEditClick).toHaveBeenCalled();
    });

    test('renders td element with save and cancel buttons when checkOut editingField is provided and index equals editingIndex', () => {
        const { container } = render(
            <table>
                <tbody>
                <tr>
                    <TableCheckOutCell
                        time={time}
                        editingIndex={2}
                        index={2}
                        editingField={'checkOut'}
                        editedCheckOut={"16:00"}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                        handleEditClick={handleEditClick}
                    />
                </tr>
                </tbody>
            </table>
        );

        const td = container.querySelector('td');
        const input = container.querySelector('input');

        expect(td).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    });

    test('calls onSave when save button is clicked', () => {
        const { container } = render(
            <table>
                <tbody>
                <tr>
                    <TableCheckOutCell
                        time={time}
                        editingIndex={2}
                        index={2}
                        editingField={'checkOut'}
                        editedCheckOut={"16:00"}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                        handleEditClick={handleEditClick}
                    />
                </tr>
                </tbody>
            </table>
        );

        const input = container.querySelector('input');
        const buttonsSpan = input.nextSibling;
        const saveButtonSpan = buttonsSpan.firstChild;
        const saveButton = saveButtonSpan.firstChild;

        expect(input).toBeInTheDocument();
        expect(buttonsSpan).toBeInTheDocument();
        expect(saveButtonSpan).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();

        fireEvent.click(saveButton);

        expect(handleSave).toHaveBeenCalled();
    });
    test('calls onCancel when cancel button is clicked', () => {
        const { container } = render(
            <table>
                <tbody>
                <tr>
                    <TableCheckOutCell
                        time={time}
                        editingIndex={2}
                        index={2}
                        editingField={'checkOut'}
                        editedCheckOut={"16:00"}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                        handleEditClick={handleEditClick}
                    />
                </tr>
                </tbody>
            </table>
        );

        const input = container.querySelector('input');
        const buttonsSpan = input.nextSibling;
        const cancelButtonSpan = buttonsSpan.firstChild.nextSibling;
        const cancelButton = cancelButtonSpan.firstChild;

        expect(input).toBeInTheDocument();
        expect(buttonsSpan).toBeInTheDocument();
        expect(cancelButtonSpan).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(cancelButton);

        expect(handleCancel).toHaveBeenCalled();
    });
});
