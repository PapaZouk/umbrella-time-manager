import PropTypes from "prop-types";

export default function GoodbyeMessage({ userName }) {
    return (
            <h3>Do zobaczenia {userName}!</h3>
    )
};

GoodbyeMessage.propTypes = {
    userName: PropTypes.string,
};
