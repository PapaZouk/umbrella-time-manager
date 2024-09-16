import {createContext, useState} from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({
    user: {},
    isLoggedIn: false,
    handleUserLogin: () => {},
    handleUserLogOut: () => {},
});

export default function UserContextProvider({ children }) {
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleUserLogin(userName) {
        if (!userName) {
            return;
        }

        setUserName(userName);
        setTimeout(() => {
            setIsLoggedIn(true)
        }, 2500);
    };

    function handleUserLogOut() {
        setIsLoggedIn(false);
    }

    const userContextValue = {
        user: {
            userName: userName,
        },
        isLoggedIn: isLoggedIn,
        handleUserLogin: handleUserLogin,
        handleUserLogOut: handleUserLogOut,
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    )
}

UserContextProvider.propTypes = {
    children: PropTypes.node,
}
