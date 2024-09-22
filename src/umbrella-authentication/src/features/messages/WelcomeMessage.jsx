import {UserContext} from "../../../../store/user-context";
import {useContext} from "react";

export default function WelcomeMessage() {
    const { user} = useContext(UserContext);

    return <h3 data-testid="welcome-message">Witaj z powrotem {user.userName}!</h3>
}
