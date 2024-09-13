import PropTypes from "prop-types";

export default function TableInput({ editedValue, handler }) {
    return (
        <input data-testid={`table-input-${editedValue}`}
             type="time"
             value={editedValue}
             onChange={handler}
            />
    )
}

TableInput.propTypes = {
    editedValue: PropTypes.string,
    handler: PropTypes.func,
};
