import buttons from "../../shared/styles/Buttons.module.css";
import PropTypes from "prop-types";

export default function AddTimeButton({ onClick }) {
    return (
        <button
            data-testid='time-controller-add-button'
            className={buttons.greenButton}
            onClick={onClick}
        >
            Dodaj godziny
        </button>
    )
};

AddTimeButton.propTypes = {
    onClick: PropTypes.func,
};
