import './App.css';
import AuthenticationApp from "./umbrella-authentication/src/features/AuthenticationApp";
import TimesApp from "./umbrella-times/src/TimesApp";
import UserContextProvider, {UserContext} from "./store/user-context";
import {useContext, useState} from "react";
import PopupsContextProvider from "./store/popups-context";
import MessagesContextProvider from "./store/messages-context";

function App() {
    return (
        <UserContextProvider>
            <PopupsContextProvider>
                <MessagesContextProvider>
                    <AppContent />
                </MessagesContextProvider>
            </PopupsContextProvider>
        </UserContextProvider>
    )
}

function AppContent() {
    const {isLoggedIn} = useContext(UserContext);

    return (
        <>
            { !isLoggedIn
                ? <AuthenticationApp />
                : <TimesApp />
            }
        </>
    );
}

export default App;
