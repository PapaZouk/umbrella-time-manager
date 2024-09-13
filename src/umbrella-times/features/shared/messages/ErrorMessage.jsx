import PropTypes from "prop-types";
import errors from '../styles/Errors.module.css';
import { ErrorIcon } from '../../ui/icons/Icons';

export function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div data-testid='error-message-popup' className={errors.errorOverlay}>
            <div className={errors.errorFrame}>
                <ErrorIcon />
                {message}
            </div>
        </div>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
};
