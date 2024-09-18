import loginStyle from '../styles/Login.module.css';
import {Container} from "../../../../umbrella-web-common/src/components/container/Container";
import PropTypes from "prop-types";
import {UserContext} from "../../../../store/user-context";
import {useContext} from "react";

export default function WelcomeMessage() {
    const { user} = useContext(UserContext);

    return (
        <Container fadeIn={true} styleModule={loginStyle}>
            <h3 data-testid="welcome-message">Witaj z powrotem {user.userName}!</h3>
        </Container>
    );
}

WelcomeMessage.propTypes = {
    userName: PropTypes.string
}
