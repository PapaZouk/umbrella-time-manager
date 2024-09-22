import {SaveTimesheet} from "../business";
import {printTable} from "../utils";
import PrintTimesheet from "../business/PrintTimesheet";
import {useContext} from "react";
import {PopupContext} from "../../../../store/popups-context";
import GoodbyeMessage from "../../../../umbrella-authentication/src/features/messages/GoodbyeMessage";
import {LoginContext} from "../../../../store/login-context";

export function TimesheetController() {
    const { isLoggedIn, handleLogOut } = useContext(LoginContext);
    const { setPopupContent, closePopup } = useContext(PopupContext);

    function handlePrint() {
        printTable();
    }

    function handleUserLogOut() {
        if (!isLoggedIn) {
            return;
        }

        setTimeout(() => {
            handleLogOut();
            }, 2000);
        setPopupContent(<GoodbyeMessage />);
        setTimeout(() => {
            closePopup();
        }, 2500);
    }

    return (
        <>
            <div data-testid='timesheet-controller'>
                <span>
                    <PrintTimesheet handlePrint={handlePrint}/>
                    <SaveTimesheet />
                    <button onClick={handleUserLogOut}>Wyloguj</button>
                </span>
            </div>
        </>
    );
};
