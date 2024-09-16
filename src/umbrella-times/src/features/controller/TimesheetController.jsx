import {SaveTimesheet} from "../business";
import {printTable} from "../utils";
import PrintTimesheet from "../business/PrintTimesheet";
import {UserContext} from "../../../../store/user-context";
import {useContext} from "react";
import {PopupContext} from "../../../../store/popups-context";
import GoodbyeMessage from "../../../../umbrella-authentication/src/features/messages/GoodbyeMessage";

export function TimesheetController() {
    const { isLoggedIn, handleUserLogOut } = useContext(UserContext);
    const { setPopupContent } = useContext(PopupContext);

    function handlePrint() {
        printTable();
    }

    function handleLogOut() {
        if (!isLoggedIn) {
            return;
        }

        setTimeout(() => {
            handleUserLogOut();
            }, 2000);
        setPopupContent(<GoodbyeMessage />);
        setTimeout(() => {
            setPopupContent("");
        }, 2500);
    }

    return (
        <>
            <div data-testid='timesheet-controller'>
                <span>
                    <PrintTimesheet handlePrint={handlePrint}/>
                    <SaveTimesheet />
                    <button onClick={handleLogOut}>Wyloguj</button>
                </span>
            </div>
        </>
    );
};
