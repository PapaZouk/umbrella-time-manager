import TableInput from "../elements/TableInput";
import TableEditButtons from "../elements/TableEditButtons";
import TableEditButton from "../elements/TableEditButton";
import PropTypes from "prop-types";

export default function TableCheckInCell(
    {
        time,
        editingIndex,
        index,
        editingField,
        editedCheckIn,
        handleInputChange,
        handleSave,
        handleCancel,
        handleEditClick,
    }) {
 return (
     <td>
         {editingIndex === index && editingField === "checkIn" ? (
             <>
                 <TableInput
                     editedValue={editedCheckIn}
                     handler={handleInputChange}
                 />
                 <TableEditButtons onSave={handleSave} onCancel={handleCancel} />
             </>
         ) : (
             <>
                 {time.checkIn}
                 <TableEditButton
                     onEditHandler={() => handleEditClick(index, "checkIn")}
                     data-testid={`edit-button-checkin-${index}`}
                 />
             </>
         )}
     </td>
 );
}

TableCheckInCell.propTypes = {
    time: PropTypes.object,
    editingIndex: PropTypes.number,
    index: PropTypes.number,
    editingField: PropTypes.string,
    editedCheckIn: PropTypes.string,
    handleInputChange: PropTypes.func,
    handleSave: PropTypes.func,
    handleCancel: PropTypes.func,
    handleEditClick: PropTypes.func,
}
