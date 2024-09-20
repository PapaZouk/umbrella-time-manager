import {SaveTimesheet} from "../business";
import {printTable} from "../utils";
import PrintTimesheet from "../business/PrintTimesheet";
import {UserContext} from "../../../../store/user-context";
import {useContext, useEffect} from "react";
import {PopupContext} from "../../../../store/popups-context";
import GoodbyeMessage from "../../../../umbrella-authentication/src/features/messages/GoodbyeMessage";

export function TimesheetController() {
    const { isLoggedIn, handleUserLogOut } = useContext(UserContext);
    const { popupContent, setPopupContent } = useContext(PopupContext);

    useEffect(() => {
        if (popupContent !== '') {
            setTimeout(() => {
                setPopupContent('');
            }, 2500);
        }
    }, [popupContent, setPopupContent]);

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
