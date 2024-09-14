import './App.css';
import AuthenticationApp from "./umbrella-authentication/src/features/AuthenticationApp";
import {useRef, useState} from "react";
import TimesApp from "./umbrella-times/src/TimesApp";

function App() {
    const user = useRef();

    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogOut() {
        setIsLoggedIn(false);
    }

    function handleLogin() {
        const login = user.current.getUserLogin();
        setUserName(login);
        setTimeout(() => {
            setIsLoggedIn(true)
        }, 2500);
    }

    return (
        <>
            { !isLoggedIn
                ? <AuthenticationApp ref={user} onLogin={handleLogin}/>
                : <TimesApp userName={userName} onLogOut={handleLogOut}/>
            }
        </>
    )
}

export default App;
