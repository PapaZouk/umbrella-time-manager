import {createContext, useState} from "react";
import PropTypes from "prop-types";

export const LoginContext = createContext({
    isLoggedIn: false,
    handleLogIn: () => {},
    handleLogOut: () => {},
    user: {},
});

export default function LoginContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userState, setUserState] = useState({});

    function handleLogIn(userName) {
        setIsLoggedIn(true);
        setUserState((previousUser) => ({
            ...previousUser,
            user: {
                userName: userName,
            },
        }));
    }

    function handleLogOut() {
        setIsLoggedIn(false);
        setUserState({});
    }

    const loginContextProviderValue = {
        isLoggedIn: isLoggedIn,
        handleLogIn: handleLogIn,
        handleLogOut: handleLogOut,
        user: userState,
    };
    return (
        <LoginContext.Provider value={loginContextProviderValue}>
            {children}
        </LoginContext.Provider>
    )
}

LoginContextProvider.propTypes = {
    children: PropTypes.node,
}
