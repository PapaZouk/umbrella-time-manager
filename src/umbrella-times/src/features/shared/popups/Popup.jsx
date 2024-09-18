import styles from '../styles/Popup.module.css';
import {useContext} from "react";
import {PopupContext} from "../../../../../store/popups-context";

export default function Popup() {
    const { popupContent } = useContext(PopupContext);
    if (!popupContent) {
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
                { popupContent }
            </div>
        </div>
    )
};
