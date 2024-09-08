import styles from '../styles/Popup.module.css';
import PropTypes from "prop-types";

export default function Popup({ content }) {
    if (!content) {
        return;
    }

    return (
        <div
            data-testid="popup-element"
            className={styles.popupOverlay}>
            <div
                data-testid="popup-content"
                className={styles.popupContent}
            >
                { content }
            </div>
        </div>
    )
};

Popup.propTypes = {
    content: PropTypes.node,
}
