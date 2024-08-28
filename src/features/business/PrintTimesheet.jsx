import styles from "./styles/PrintTimesheet.module.css";
import PropTypes from "prop-types";

export default function PrintTimesheet({handlePrint}) {
    return (
        <button data-testid='print-button'
            className={styles.printButton}
            onClick={handlePrint}>
            Drukuj
        </button>
    )
}

PrintTimesheet.propTypes = {
    handlePrint: PropTypes.func,
}
