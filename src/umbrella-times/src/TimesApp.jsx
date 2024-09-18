import "../../App.css";
import {useContext} from "react";
import {DaySelector, EmployeeSelector, EmployeeTable, MonthSelector, TimesheetController,} from "./features/business";
import Header from "./features/ui/header/Header";
import {Container, ErrorMessage, SuccessMessage} from "./features/shared";
import TimesController from "./features/controller/TimesController";
import Popup from "./features/shared/popups/Popup";
import EmployeeTimesheetContextProvider from "../../store/employee-timesheet-context";
import DateSelectionContextProvider from "../../store/date-selection-context";
import {MessagesContext} from "../../store/messages-context";

function TimesApp() {
    const { setErrorMessage } = useContext(MessagesContext);

    return (
        <EmployeeTimesheetContextProvider setError={setErrorMessage}>
            <DateSelectionContextProvider>
                <Container>
                    <Header>
                        <TimesheetController />
                    </Header>
                    <Container>
                        <div className="controls">
                            <MonthSelector />
                            <DaySelector />
                        </div>
                    </Container>

                    <Container>
                        <EmployeeSelector />
                    </Container>

                    <Container>
                        <TimesController />
                    </Container>

                    <EmployeeTable />
                    <ErrorMessage />
                    <SuccessMessage />
                    <Popup />
                </Container>
            </DateSelectionContextProvider>
        </EmployeeTimesheetContextProvider>
    );
}

export default TimesApp;
