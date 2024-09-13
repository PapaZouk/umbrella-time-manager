import buttons from "../../shared/styles/Buttons.module.css";
import PropTypes from "prop-types";

export default function AddTrainingButton({ onClick }) {
    return (
        <button
            data-testid='time-controller-business-training-button'
            className={buttons.blueButton}
            onClick={onClick}
        >
            Dodaj szkolenie
        </button>
    );
};

AddTrainingButton.propTypes = {
    onClick: PropTypes.func,
};
