import {createContext, useState} from "react";
import PropTypes from "prop-types";

export const PopupContext = createContext({
    setPopupContent: () => {},
    closePopup: () => {},
    popupContent: "",
});

export default function PopupsContextProvider({children}) {
    const [popupContent, setPopupContent] = useState("");

    function handlePopupChange(content) {
        setPopupContent(content);
    }

    function closePopup() {
        setTimeout(() => {
            setPopupContent("");
        }, 200);
    };

    const popupContextValue = {
        setPopupContent: handlePopupChange,
        closePopup: closePopup,
        popupContent: popupContent,
    }

    return (
        <PopupContext.Provider value={popupContextValue}>
            {children}
        </PopupContext.Provider>
    )
}

PopupsContextProvider.propTypes = {
    children: PropTypes.node,
}
