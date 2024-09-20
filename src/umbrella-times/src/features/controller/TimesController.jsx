import {useContext, useEffect, useState} from "react";
import {calculateBalance} from "../utils";
import {dayOffTypes} from "../../resources/dayOffTypes";
import {CreateTimesheet} from "../utils/factory/TimesheetFactory";
import AddTimeButton from "./components/AddTimeButton";
import AddDayOffButton from "./components/AddDayOffButton";
import AddBusinessTripButton from "./components/AddBusinessTripButton";
import AddTrainingButton from "./components/AddTrainingButton";
import {PopupContext} from "../../../../store/popups-context";
import TimesInputs from "../business/TimesInputs";
import DayOffPopup from "../shared/popups/DayOffPopup";
import TrainingPopup from "../shared/popups/TrainingPopup";
import {EmployeeTimesheetContext} from "../../../../store/employee-timesheet-context";
import {MessagesContext} from "../../../../store/messages-context";
import {DateSelectionContext} from "../../../../store/date-selection-context";

export default function TimesController() {
    const { closePopup, setPopupContent } = useContext(PopupContext);
    const { selectedEmployee, updateTimesheet } = useContext(EmployeeTimesheetContext);
    const { errorMessage, setErrorMessage } = useContext(MessagesContext);
    const { selectedMonth, selectedDay } = useContext(DateSelectionContext);

    useEffect(() => {
        if (errorMessage !== '') {
            setTimeout(() => {
               setErrorMessage('')
            }, 2000);
        }
    }, [errorMessage, setErrorMessage]);

    // eslint-disable-next-line no-unused-vars
    const [checkIn, setCheckIn] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [checkOut, setCheckOut] = useState("");

    const handleAddTime = () => {
        if (!isInitialTimesheetDataProvided({selectedMonth, selectedDay, selectedEmployee})) {
            return;
        }
        setPopupContent(<TimesInputs handleCloseTimesInputs={handleCloseTimesInputsPopup}/>);
    };

    const handleAddDayOff = () => {
        if (!isInitialTimesheetDataProvided({selectedMonth, selectedDay, selectedEmployee})) {
            return;
        }
        setPopupContent(<DayOffPopup onSaveDayOff={handleSaveDayOff}/>);
    };

    const handleAddTraining = () => {
      if (!isInitialTimesheetDataProvided({selectedMonth, selectedDay, selectedEmployee})) {
          return;
      }
        setPopupContent(<TrainingPopup onSaveTraining={handleTrainingButton}/>);
    };

    const handleSaveDayOff = (selectedDayOff) => {
        closePopup();
        const dayOffType = Array.from(dayOffTypes()).filter((day) => day === selectedDayOff)[0];
        let timesheetData = {};

        switch (dayOffType) {
            case 'Zwolnienie lekarskie':
                timesheetData = {isSickLeave: true};
                break;
            case 'Bezpłatny urlop':
                timesheetData = {isUnpaidLeave: true};
                break;
            case "Urlop macierzyński":
                timesheetData = {isMaternityLeave: true};
                break;
            case "Urlop okazjonalny":
                timesheetData = {isOccasionalLeave: true};
                break;
            case "Urlop wychowawczy":
                timesheetData = {isParentalLeave: true};
                break;
            default:
                timesheetData = {isHoliday: true};
        }
        const newTimesheet = CreateTimesheet({
            employee: selectedEmployee,
            month: selectedMonth,
            day: selectedDay,
            dayOff: dayOffType,
            ...timesheetData,
        });

        updateTimesheet(newTimesheet);
        resetCheckInAndCheckOut();
    };

    const handleAddBusinessTrip = () => {
        if (!isInitialTimesheetDataProvided({selectedMonth, selectedDay, selectedEmployee})) {
            return;
        }
        const newTimesheetWithBusinessTrip = CreateTimesheet(
            {
                employee: selectedEmployee,
                month: selectedMonth,
                day: selectedDay,
                isBusinessTrip: true,
            }
        );
        updateTimesheet(newTimesheetWithBusinessTrip);
        resetCheckInAndCheckOut();
    };

    const handleTrainingButton = (trainingType) => {
      closePopup();

      if (!isInitialTimesheetDataProvided({selectedMonth, selectedDay, selectedEmployee})) {
          return;
      }

      const newTimesheetWithTraining = CreateTimesheet(
          {
              employee: selectedEmployee,
              month: selectedMonth,
              day: selectedDay,
              isTraining: true,
              trainingType: trainingType
          }
      );
      updateTimesheet(newTimesheetWithTraining);
      resetCheckInAndCheckOut();
    };

    const handleSave = (newCheckIn, newCheckOut) => {
        if (!hasAllTimes(newCheckIn, newCheckOut, selectedEmployee)) {
            return;
        }

        const balance = calculateBalance(newCheckIn, newCheckOut, 8);
        const newTimesheet = CreateTimesheet(
            {
                employee: selectedEmployee,
                checkIn: newCheckIn,
                checkOut: newCheckOut,
                month: selectedMonth,
                day: selectedDay,
                balance: balance,
            },
        );

        updateTimesheet(newTimesheet);
        resetCheckInAndCheckOut();
    };

    const handleCloseTimesInputsPopup = (checkIn, checkOut) => {
        closePopup();
        handleSave(checkIn, checkOut);
    };

    const resetCheckInAndCheckOut = () => {
        setCheckIn("");
        setCheckOut("");
    };

    function isInitialTimesheetDataProvided({selectedMonth, selectedDay, selectedEmployee}) {
        if (!selectedMonth) {
            setErrorMessage('Wybierz miesiąc');
            return false;
        } else if (!selectedDay) {
            setErrorMessage('Wybierz dzień');
            return false;
        } else if (!selectedEmployee || selectedEmployee.name === '' || selectedEmployee.surname === '') {
            setErrorMessage('Wybierz pracownika');
            return false;
        } else {
            return true;
        }
    }

    function hasAllTimes(checkIn, checkOut, selectedEmployee) {
        if (
            (checkIn && checkOut && selectedEmployee) &&
            (checkIn !== '' && checkOut !== '') &&
            (selectedEmployee.name !== '' && selectedEmployee.surname !== '')
        ) {
            return true;
        }
        setErrorMessage("Uzupełnij wszystkie dane");
        return false;
    }

    return (
        <div>
            <AddTimeButton onClick={handleAddTime} />
            <AddDayOffButton onClick={handleAddDayOff} />
            <AddBusinessTripButton onClick={handleAddBusinessTrip} />
            <AddTrainingButton onClick={handleAddTraining} />
        </div>
    );
};
