import styles from './styles/Login.module.css';
import {useState} from "react";
import PropTypes from "prop-types";

export default function Login({ setIsLoggedIn }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        if (login === 'Rafal' && password === 'password123') {
            setIsLoggedIn(true);
        } else {
            setError("Nieprawidłowe dane");
            setTimeout(() => {
                setError(null)
            }, 2500);
        }
    };

    return (
      <div className={styles.loginContainer}>
          {error && <p>Niepoprawne dane</p>}
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
              className={styles.loginInput}
              id="login-input"
              value={login}
              onChange={handleLoginChange}
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
              className={styles.loginInput}
              id="password-input"
              value={password}
              onChange={handlePasswordChange}
          />
          <button
            className={styles.loginButton}
            onClick={handleLogin}
          >
            Zaloguj
          </button>
      </div>
    );
};

Login.propTypes = {
    setIsLoggedIn: PropTypes.func,
};
