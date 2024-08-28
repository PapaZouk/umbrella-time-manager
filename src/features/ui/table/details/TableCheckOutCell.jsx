import TableInput from "../elements/TableInput";
import TableEditButtons from "../elements/TableEditButtons";
import TableEditButton from "../elements/TableEditButton";
import PropTypes from "prop-types";

export default function TableCheckOutCell(
    {
        time,
        editingIndex,
        index,
        editingField,
        editedCheckOut,
        handleInputChange,
        handleSave,
        handleCancel,
        handleEditClick,
    }) {
    return (
        <td>
            {editingIndex === index && editingField === "checkOut" ? (
                <>
                    <TableInput
                        editedValue={editedCheckOut}
                        handler={handleInputChange}
                    />
                    <TableEditButtons onSave={handleSave} onCancel={handleCancel} />
                </>
            ) : (
                <>
                    {time.checkOut}
                    <TableEditButton
                        onEditHandler={() => handleEditClick(index, "checkOut")}
                        data-testid={`edit-button-checkout-${index}`}
                    />
                </>
            )}
        </td>
    );
};

TableCheckOutCell.propTypes = {
    time: PropTypes.object,
    editingIndex: PropTypes.number,
    index: PropTypes.number,
    editingField: PropTypes.string,
    editedCheckOut: PropTypes.string,
    handleInputChange: PropTypes.func,
    handleSave: PropTypes.func,
    handleCancel: PropTypes.func,
    handleEditClick: PropTypes.func,
}
