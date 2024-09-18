import {UserContext} from "../../../../store/user-context";
import {useContext} from "react";

export default function GoodbyeMessage() {
    const {user} = useContext(UserContext);
    return (
            <h3>Do zobaczenia {user.userName}!</h3>
    )
};
