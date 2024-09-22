import './App.css';
import TimesApp from "./umbrella-times/src/TimesApp";
import UserContextProvider from "./store/user-context";
import {useContext} from "react";
import PopupsContextProvider from "./store/popups-context";
import MessagesContextProvider from "./store/messages-context";
import AuthenticationApp from "./umbrella-authentication/src/AuthenticationApp";
import LoginContextProvider, {LoginContext} from "./store/login-context";

function App() {
    return (
        <LoginContextProvider>
            <UserContextProvider>
                <PopupsContextProvider>
                    <MessagesContextProvider>
                        <AppContent />
                    </MessagesContextProvider>
                </PopupsContextProvider>
            </UserContextProvider>
        </LoginContextProvider>
    )
}

function AppContent() {
    const {isLoggedIn}  = useContext(LoginContext);

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
