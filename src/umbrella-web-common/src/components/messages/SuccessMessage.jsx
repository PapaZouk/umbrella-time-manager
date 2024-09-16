import {SuccessIcon} from "../../icons/Icons";
import successStyle from '../styles/Success.module.css';
import {useContext} from "react";
import {MessagesContext} from "../../../../store/messages-context";
import ''

export function SuccessMessage() {
    const { successMessage } = useContext(MessagesContext);

    if (!successMessage) return null;

    return (
        <div data-testid='success-message-popup' className={successStyle.successOverlay}>
            <div className={successStyle.successFrame}>
                <SuccessIcon />
                {successMessage}
            </div>
        </div>
    );
}
