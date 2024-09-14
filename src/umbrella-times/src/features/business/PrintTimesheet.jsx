import buttons from '../shared/styles/Buttons.module.css';
import PropTypes from "prop-types";

export default function PrintTimesheet({handlePrint}) {
    return (
        <button data-testid='print-button'
            className={buttons.greenButton}
            onClick={handlePrint}>
            Drukuj
        </button>
    )
}

PrintTimesheet.propTypes = {
    handlePrint: PropTypes.func,
}
