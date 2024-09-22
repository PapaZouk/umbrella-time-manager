import {useContext, useState} from "react";
import {UserContext} from "../../../../store/user-context";
import styles from '../styles/Login.module.css';
import effects from '../../../../umbrella-web-common/src/components/styles/Effects.module.css';
import {LoginContext} from "../../../../store/login-context";
import {PopupContext} from "../../../../store/popups-context";
import WelcomeMessage from "../messages/WelcomeMessage";
import PropTypes from "prop-types";

const validateLogin = (data, handleErrorMessage, setUserCredentials) => {
    if (
        (!data.login && !data.password) || (data.login === '' && data.password === '')
    ) {
        handleErrorMessage('Uzupełnij wszystkie dane');
        setUserCredentials({
            hasLogin: false,
            hasPassword: false,
        });
        return false;
    }
    else if(data.login === '' && data.password !== '') {
        handleErrorMessage('Podaj login');
        setUserCredentials({
            hasLogin: false,
            hasPassword: true,
        });
        return false;
    }

    if(!data.password || data.password === '') {
        handleErrorMessage('Podaj hasło');
        setUserCredentials({
            hasLogin: true,
            hasPassword: false,
        });
        return false;
    }

    if (!data.login || data.login === '') {
        handleErrorMessage('Podaj login');
        setUserCredentials({
            hasLogin: false,
            hasPassword: true,
        });
        return false;
    }
    return true;
}

export default function Login({ isError, switchError, handleErrorMessage }) {
    const { handleUserLogin } = useContext(UserContext);
    const { handleLogIn } = useContext(LoginContext);
    const { setPopupContent, closePopup } = useContext(PopupContext);
    const [userCredentials, setUserCredentials] = useState({});

    const handleLogin = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (!validateLogin(data, handleErrorMessage, setUserCredentials)) {
            switchError();
            return;
        }

        if (data.login === 'User' && data.password === 'password') {
            handleLogIn(data.login);
            handleUserLogin(data.login);
            setPopupContent(<WelcomeMessage/>);
            setTimeout(() => {
                closePopup();
            }, 2500);
        } else {
            switchError();
            setUserCredentials({ hasLogin: false, hasPassword: false });
            handleErrorMessage('Niepoprawne dane');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label
                data-testid='login-label'
                htmlFor="login-input"
                className={styles.loginLabel}
            >
                Login
            </label>
            <input
                data-testid='login-input'
                type="text"
                name="login"
                className={`${styles.loginInput} ${isError && !userCredentials.hasLogin ? effects.errorEffect : ''}`}
                id="login-input"
            />
            <label
                data-testid='password-label'
                htmlFor="password-input"
                className={styles.loginLabel}
            >
                Hasło
            </label>
            <input
                data-testid='password-input'
                type="password"
                name="password"
                className={`${styles.loginInput} ${isError && !userCredentials.hasPassword ? effects.errorEffect : ''}`}
                id="password-input"
            />
            <button
                data-testid='auth-submit-button'
                className={styles.loginButton}
            >
                Zaloguj
            </button>
        </form>
    );
}

Login.propTypes = {
    isError: PropTypes.func,
    switchError: PropTypes.func,
    handleErrorMessage: PropTypes.func,
}
