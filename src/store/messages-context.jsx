import {createContext, useState} from "react";
import PropTypes from "prop-types";

export const MessagesContext = createContext({
    successMessage: '',
    errorMessage: '',
    setSuccessMessage: () => {},
    setErrorMessage: () => {},
});

export default function MessagesContextProvider({children}) {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleSuccessMessageChange(message) {
        setSuccessMessage(message);
    }

    function handleErrorMessageChange(message) {
        setErrorMessage(message);
    }

    const messagesContextValue = {
        successMessage: successMessage,
        errorMessage: errorMessage,
        setSuccessMessage: handleSuccessMessageChange,
        setErrorMessage: handleErrorMessageChange,
    }

    return (
        <MessagesContext.Provider value={messagesContextValue}>
            {children}
        </MessagesContext.Provider>
    )
}

MessagesContextProvider.propTypes = {
    children: PropTypes.node,
}
