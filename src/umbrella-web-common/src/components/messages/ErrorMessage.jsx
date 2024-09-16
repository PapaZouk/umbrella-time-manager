import errors from '../styles/Errors.module.css';
import {ErrorIcon} from '../../icons/Icons';
import {useContext} from "react";
import {MessagesContext} from "../../../../store/messages-context";

export function ErrorMessage() {
    const { errorMessage} = useContext(MessagesContext);
    if (!errorMessage) return null;

    return (
        <div data-testid='error-message-popup' className={errors.errorOverlay}>
            <div className={errors.errorFrame}>
                <ErrorIcon />
                {errorMessage}
            </div>
        </div>
    );
}
