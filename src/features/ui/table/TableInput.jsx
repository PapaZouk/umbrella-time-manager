import PropTypes from "prop-types";

export default function TableInput({ editedValue, handler }) {
    return (
        <input
             type="time"
             value={editedValue}
             onChange={handler}
            />
    )
}

TableInput.propTypes = {
    editedValue: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
};
