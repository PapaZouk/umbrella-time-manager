import styles from './features/styles/Login.module.css';
import errors from '../../umbrella-web-common/src/components/styles/Errors.module.css';
import {useContext, useState} from "react";
import WelcomeMessage from "../src/features/messages/WelcomeMessage";
import {Container} from '../../umbrella-web-common/src/components/container/Container';
import Login from "./features/login/Login";
import {LoginContext} from "../../store/login-context";

export default function AuthenticationApp() {
    const { isLoggedIn} = useContext(LoginContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);

    function handleErrorChange() {
        setIsError(true);
        setTimeout(() => {
           setIsError(false);
        }, 2500);
    }

    function handleErrorMessageChange(message) {
        setErrorMessage(message);
        setTimeout(() => {
           setErrorMessage('');
        }, 2500);
    }

    return (
        <>
          {isLoggedIn ? <WelcomeMessage /> : (
              <Container fadeIn={true} styleModule={styles}>
                  {isError && <p className={errors.errorFrame}>{errorMessage}</p>}
                  <Login
                      isError={isError}
                      switchError={handleErrorChange}
                      handleErrorMessage={handleErrorMessageChange}
                  />
              </Container>
          )}
        </>
    );
};
