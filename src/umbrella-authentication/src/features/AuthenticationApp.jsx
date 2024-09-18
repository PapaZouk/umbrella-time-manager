import styles from './styles/Login.module.css';
import errors from '../../../umbrella-web-common/src/components/styles/Errors.module.css';
import effects from '../../../umbrella-web-common/src/components/styles/Effects.module.css';
import {useContext, useRef, useState} from "react";
import PropTypes from "prop-types";
import WelcomeMessage from "./messages/WelcomeMessage";
import {Container} from "../../../umbrella-web-common/src/components/container/Container";
import {UserContext} from "../../../store/user-context";

export default function AuthenticationApp() {
    const { handleUserLogin } = useContext(UserContext);

    const loginInput = useRef();
    const passwordInput = useRef();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const resetError = () => setTimeout(() => setError(null), 2500);

    const handleLogin = () => {
        if (!loginInput.current.value || !passwordInput.current.value) {
            setError(true);
            setErrorMessage('Uzupełnij wszystkie dane');
            resetError();
        } else if (loginInput.current.value === 'User' && passwordInput.current.value === 'password') {
            handleUserLogin(loginInput.current.value);
            setSuccess(true);
        } else {
            setError(true);
            setErrorMessage("Niepoprawne dane");
            resetError();
        }
    };

    return (
        <>
          {success ? <WelcomeMessage /> : (
              <Container fadeIn={true} styleModule={styles}>
                  {error && <p className={errors.errorFrame}>{errorMessage}</p>}
                  <label
                      data-testid='login-label'
                      htmlFor="login-input"
                      className={styles.loginLabel}
                  >
                      Login
                  </label>
                  <input
                      data-testid='login-input'
                      ref={loginInput}
                      type="text"
                      className={`${styles.loginInput} ${error && loginInput.current.value === '' ? effects.errorEffect : ''}`}
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
                      ref={passwordInput}
                      type="password"
                      className={`${styles.loginInput} ${error && passwordInput.current.value === '' ? effects.errorEffect : ''}`}
                      id="password-input"
                  />
                  <button
                      data-testid='auth-submit-button'
                      className={styles.loginButton}
                      onClick={handleLogin}
                  >
                      Zaloguj
                  </button>
              </Container>
          )}
        </>
    );
};

AuthenticationApp.propTypes = {
    handleLogIn: PropTypes.func,
};
