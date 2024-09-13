import './App.css';
import Login from "./umbrella-authentication/features/Login";
import {useState} from "react";
import TimesApp from "./umbrella-times/TimesApp";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <>
            { !isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn}/> : <TimesApp />}
        </>
    )
}

export default App;
