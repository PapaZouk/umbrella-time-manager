import buttons from "../../shared/styles/Buttons.module.css";
import PropTypes from "prop-types";

export default function AddDayOffButton({ onClick }) {
    return (
        <button
            data-testid='time-controller-day-off-button'
            className={buttons.yellowButton}
            onClick={onClick}
        >
            Dodaj dzień wolny
        </button>
    )
};

AddDayOffButton.propTypes = {
    onClick: PropTypes.func,
};
