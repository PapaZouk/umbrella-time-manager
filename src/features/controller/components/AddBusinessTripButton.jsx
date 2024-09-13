import buttons from "../../shared/styles/Buttons.module.css";
import PropTypes from "prop-types";

export default function AddBusinessTripButton({ onClick }) {
    return (
        <button
            data-testid='time-controller-business-trip-button'
            className={buttons.blueButton}
            onClick={onClick}
        >
            Wyjazd służbowy
        </button>
    );
};

AddBusinessTripButton.propTypes = {
    onClick: PropTypes.func,
};
