import loginStyle from '../styles/Login.module.css';
import {Container} from "../../../../umbrella-web-common/src/components/container/Container";
import PropTypes from "prop-types";

export default function WelcomeMessage({ userName }) {
    return (
        <Container fadeIn={true} styleModule={loginStyle}>
            <h3 data-testid="welcome-message">Witaj z powrotem {userName}!</h3>
        </Container>
    );
}

WelcomeMessage.propTypes = {
    userName: PropTypes.string
}
